import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {SharedServicesModule} from '../shared/shared-services.module';
import {SharedLibsModule} from '../shared/shared-libs.module';
import {CoreModule} from '../core';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    CoreModule,
    RouterModule.forChild(routes),
    NgbCarouselModule.forRoot(),
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
