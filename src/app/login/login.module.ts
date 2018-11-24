import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {NgbCarouselModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ActividadCivicaService} from '../shared/services/actividad-civica.service';
import {ReunionService} from '../shared/services/reunion.service';
import {FormsModule} from '@angular/forms';
import {AccountService, AuthStorage, LoginService} from '../shared/auth';
import {AuthServerProvider} from '../shared/auth/auth-jwt.service';
import {Principal} from '../shared/auth/principal.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    NgbCarouselModule.forRoot(),
    NgbModalModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    ActividadCivicaService,
    ReunionService,
    LoginService,
    AuthServerProvider,
    Principal,
    AccountService,
    AuthServerProvider,
    AuthStorage
  ]
})
export class LoginModule {
}
