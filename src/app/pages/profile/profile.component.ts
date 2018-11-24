import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {default as swal} from 'sweetalert2';
import {User} from '../../shared/user/user.model';
import {AccountService} from '../../shared/auth/account.service';
import {UserBindService} from '../../shared/service/userBind.service';
import {CropperModalComponent} from '../../shared/components/modal-cropper.component';
import {HttpResponse} from '@angular/common/http';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, AfterViewChecked {
  user: User;
  newPassword: string;
  confirmPassword: string;

  constructor(private accountService: AccountService,
              private userbindService: UserBindService,
              private modalService: NgbModal,) {

    this.userbindService.events$.forEach(event => {
      this.user = Object.assign({}, event.data);
    });

  }

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    this.accountService.get().toPromise().then((account) => {
      if (account) {
        this.user = account.body;
      }
    }).catch((err) => {
    });
  }

  open() {
    const modalRef = this.modalService.open(CropperModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.urlImage = 'api/account/update_photo';
    modalRef.componentInstance.entity = 'profile';
    modalRef.componentInstance.title = 'cambiar imagen de perfil';
  }

  userForm: NgForm;
  @ViewChild('userForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.userForm) {
      return;
    }
    this.userForm = this.currentForm;
    if (this.userForm) {
      this.userForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm.form;

    for (const field in this.userFormErrors) {
      this.userFormErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessagesUserForm[field];
        for (const key in control.errors) {
          this.userFormErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  userFormErrors = {
    'firstName': '',
    'lastName': '',
    'email': ''
  };

  validationMessagesUserForm = {
    'firstName': {
      'required': 'Nombre es requerido.',
      'minlength': 'El nombre debe tener al menos 3 caracteres',
      'maxlength': 'El nombre no puede tener más de 24 caracteres.'
    }, 'lastName': {
      'required': 'Apellido es requerido.',
      'minlength': 'El apellido debe tener al menos 3 caracteres.',
      'maxlength': 'El apellido no puede tener más de 24 caracteres.'
    }, 'email': {
      'required': 'Email es requerido.',
      'minlength': 'El email debe tener al menos 4 caracteres.',
      'maxlength': 'Email no puede tener más 40 caracteres.',
      'email': 'Email inválido.'
    }
  };

  saveUserForm() {
    this.accountService.save(this.user).subscribe(
      (res: HttpResponse<any>) => this.onSuccess(res.body, res.headers),
      (res: HttpResponse<any>) => this.onError(res.body, res.headers, res.status)
    );
  }

  saveChangePassForm() {
    if (this.newPassword !== this.confirmPassword) {
      swal({
        title: 'Oops...',
        text: 'Las contraseñas no son iguales.',
        type: 'warning',
        confirmButtonText: 'Aceptar',
        timer: 2000
      }).catch(swal.noop);
    } else {
      console.log('entro');

      this.accountService.changePassword(this.newPassword).subscribe(
        (res: HttpResponse<any>) => this.onSuccess(res.body, res.headers),
        (res: HttpResponse<any>) => this.onError(res.body, res.headers, res.status)
      );
    }
  }

  private onSuccess(data, headers) {
    this.getAccount();
    this.userbindService.sendMessage(this.user);
    swal({
      text: 'Se ha actualizado sus datos exitosamente.',
      type: 'success',
      showConfirmButton: false,
      timer: 2500
    }).catch(swal.noop);
  }

  private onError(error, headers, status) {
    if (status === 400) {
      swal({
        title: 'Duplicación de email',
        text: 'El email ya está en uso, intente de nuevo por favor.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      }).catch(swal.noop);
    } else {
      swal({
        title: 'Oops...',
        text: 'Ocurrió un error inesperado!.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      }).catch(swal.noop);
    }
  }

  launchUpload() {
    $('#uploadInput').trigger('click');
  }
}
