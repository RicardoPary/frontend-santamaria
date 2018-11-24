import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../shared/auth';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  modalReference: NgbModalRef;


  constructor(private loginService: LoginService,
              public router: Router,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  login (form) {
    this.loginService.login ({
      username: form.value.username,
      password: form.value.password,
      rememberMe: false
    }).then (() => {
      this.activeModal.close();
      this.router.navigate (['/dashboard']);
    }).catch ((e) => console.log(e));
  }

}
