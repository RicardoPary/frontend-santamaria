import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTE_TRANSITION} from '../../../app.animation';
import {LoginService} from '../../../core-auth';

@Component({
  selector: 'elastic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: {'[@routeTransition]': ''}
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login({
      username: this.email,
      password: this.password,
      rememberMe: false
    }).then(() => {
      this.router.navigate(['/']);
    }).catch((e) => console.log(e));
  }

}
