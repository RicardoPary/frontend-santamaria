import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
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
    HomeRoutingModule,
    FormsModule,
    NgbCarouselModule.forRoot(),
    NgbModalModule
  ],
  declarations: [
    HomeComponent
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
export class HomeModule {
}
