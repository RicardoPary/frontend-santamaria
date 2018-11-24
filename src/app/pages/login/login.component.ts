import {AfterViewInit, Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/index';

import {LoginService} from '../../shared/service/login.service';
import {StateStorageService} from '../../shared/auth/state-storage.service';
import {VulLoaderService} from '../../shared/components/loader/vul-loader.service';
import {AccountService} from '../../shared/auth/account.service';
import {debounceTime} from 'rxjs/internal/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit, OnInit {

  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;

  hiddenResetPassword = true;

  closeResult: string;
  private _success = new Subject<string>();
  alertMessage: string;

  constructor(private loginService: LoginService,
              private stateStorageService: StateStorageService,
              private elementRef: ElementRef,
              private renderer: Renderer,
              private loader: VulLoaderService,
              private modalService: NgbModal,
              private router: Router,
              private accountService: AccountService) {
  }

  ngAfterViewInit() {
    $('#username').focus();
  }

  ngOnInit(): void {
    this._success.subscribe((message) => this.alertMessage = message);
    /*debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);*/
  }

  login() {
    this.accountService.sentMenuUser(null);
    this.loader.show('Identificando...');
    this.loginService.login({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    }).then(() => {
      this.authenticationError = false;
      this.loader.hide();
      this.router.navigate(['']);
    }).catch((e) => {
      this.authenticationError = true;
      this.alertMessage = 'Usuario o contraseña no válidos. Intente de nuevo por favor.';

      this.loader.hide();
      if (e && e.status == 0) {
        this.authenticationError = true;
        this._success.next('Error de conexión.');
      } else if (e && e.status == 401) {
        this.authenticationError = true;
        this._success.next('Usuario o contraseña no válidos. Intente de nuevo por favor.');
      }
    });
  }

  onResetPassword() {
    this.hiddenResetPassword = !this.hiddenResetPassword;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
