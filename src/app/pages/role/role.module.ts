import {NgModule} from '@angular/core';
import {RoleComponent} from './role.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  }
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RoleComponent
  ]
})
export class RoleModule {
}
