import {Component, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../shared/services';
import {RoleService} from '../../shared/services';
import {UserFilter} from '../../shared/models/user';
import {LoaderService} from '../../shared/components/loader/loader.service';
import {AlertService} from '../../shared/components/alert/alert.service';
import {finalize} from 'rxjs/internal/operators';
import {Subscription} from 'rxjs/index';
import {AccountService} from '../../shared/services/account.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  currentUser: any;
  status = true;
  roles: any = [];
  inputFilter = '';
  passForm: FormGroup;

  users: any = [];
  filtersColumns: any;
  totalUsers: number;
  pageSize: number;
  page: number;

  subscriptionTable: Subscription;

  headersColumns: any = [
    {
      name: 'firstName',
      displayName: 'Nombres',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'lastName',
      displayName: 'Apellidos',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: 'error de digitos.',
      type: 'text'
    },
    {
      name: 'login',
      displayName: 'Nombre de Usuario',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: 'error de digitos.',
      type: 'text'
    },
    {
      name: 'role',
      displayName: 'Rol',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: 'error de digitos.',
      type: 'rolUserObject',
      index: 'name'
    },
    {
      name: 'activated',
      displayName: 'Estado',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: 'error de digitos.',
      type: 'statusUser'
    },
    {
      name: '',
      displayName: 'Acción',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'userActions'
    }
  ];

  @ViewChild('modalUserNewEdit') modalUserNewEdit: ElementRef;
  @ViewChild('modalUserReset') modalUserReset: ElementRef;
  modal: NgbModalRef;
  titleModal = '';
  user: any;


  clickEvent() {
    this.status = !this.status;
  }

  constructor(private userService: UserService,
              private roleService: RoleService,
              private modalService: NgbModal,
              private loader: LoaderService,
              private alert: AlertService,
              private accountService: AccountService) {

    this.userService.currentFilterUsers().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
    this.roleService.getRoles().subscribe(
      res => this.roles = res.body,
      err => err
    );
    this.accountService.getAccount().subscribe(res => res.body.role.name === 'Administrador' ? this.currentUser = res.body : '');
  }

  ngOnDestroy() {
    this.subscriptionTable.unsubscribe();
  }

  callService(userFilter: UserFilter) {
    this.subscriptionTable = this.userService.getAllUsers(userFilter).subscribe(res => {
      this.totalUsers = parseFloat(res.headers.get('X-Total-Count'));
      this.users = res.body;
    });
  }

  get password() {
    return this.passForm.get('password');
  }

  get confirmPassword() {
    return this.passForm.get('confirmPassword');
  }

  showModalUserNew(content) {
    this.titleModal = 'Nuevo Usuario';
    this.user = null;
    this.modal = this.modalService.open(content, {size: 'lg', backdrop: 'static'});
  }

  clickPagination(event: any) {
    const filter = this.userService.getFilterUsers();
    filter.page = (event.newPage) - 1;
    this.userService.sendFilterUsers(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.userService.getFilterUsers();
    filter.sort = [event.column + ',' + state];
    this.userService.sendFilterUsers(filter);
    this.userService.sendFilterUsers(filter);
  }

  clickButton(event) {
    this.user = event.item;
    if (event.description === 'editUser') {
      this.titleModal = 'Editar Usuario';
      this.modal = this.modalService.open(this.modalUserNewEdit, {backdrop: 'static'});
    } else if (event.description === 'resetUser') {
      this.modal = this.modalService.open(this.modalUserReset, {backdrop: 'static'});
    } else if (event.description === 'activado' || event.description === 'desactivado') {
      event.item.activated = event.description === 'activado' ? false : true;
      this.userService.changeStateUserCompany(event.item)
        .pipe(finalize(() => this.userService.sendFilterUsers(new UserFilter)))
        .subscribe(
          (res) => {
            this.alert.showSuccess({
              html: `Usuario <b>${event.item.login}</b> se cambio su estado a <b>${event.item.activated ? 'Activado' : 'Desactivado'}</b>.`
            });
          },
          error => {
            if (error.status == 403) {
              this.alert.showError({text: 'Este usuario es ROOT'});
            } else {
              this.alert.showError({text: 'error al cambiar el estado de usuario.'});
            }
          }
        );
    }
  }

  closeModal() {
    this.modal.close();
  }

  savePassword(form) {
    this.loader.show();
    this.userService.updateUserPasswordCompany({
      id: this.user.id,
      password: form.value.password
    }).pipe(finalize(() => this.loader.hide()))
      .subscribe(
        res => {
          this.modal.close();
          this.alert.showSuccess({text: 'contraseña actualizado correctamente.'});
        }, err => this.alert.showError({text: 'error durante el reseteado de contraseña.'})
      );
    this.closeModal();
  }

  saveUser(form) {
    if (this.titleModal === 'Editar Usuario') {
      this.loader.show();
      this.userService.updateUserCompany({
        id: this.user.id,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        login: this.user.login,
        role: form.value.role
      }).pipe(finalize(() => {
        this.loader.hide();
        this.userService.sendFilterUsers(new UserFilter);
      }))
        .subscribe(
          res => {
            this.modal.close();
            this.alert.showSuccess({text: 'Usuario actualizado correctamente.'});
          }, err => {
            this.alert.showError({text: 'hubo un error al actualizar el usuario.'});
          }
        );

    } else if (this.titleModal === 'Nuevo Usuario') {
      this.loader.show();
      this.userService.createUserCompany({
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        login: form.value.login,
        password: form.value.password,
        role: form.value.role
      })
        .pipe(finalize(() => {
          this.loader.hide();
          this.userService.sendFilterUsers(new UserFilter);
        }))
        .subscribe(
          res => {
            this.modal.close();
            this.alert.showSuccess({text: 'Usuario creado correctamente.'});
          }, err => {
            this.alert.showError({text: 'hubo un error al crear el usuario.'});
          }
        );
    }
    this.closeModal();
  }
}
