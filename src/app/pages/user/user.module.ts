import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from './user.component';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {SharedServicesModule} from '../../shared/shared-services.module';

export const routes: Routes = [
  {path: '', component: UserComponent}
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule {
}
