import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbCarouselModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';

export const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    NgbModule,
    NgbCarouselModule,
    NgbModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ],
  providers: [

  ]
})
export class LoginModule {
}
