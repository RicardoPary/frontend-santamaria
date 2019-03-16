import {NgModule} from '@angular/core';
import {StaffComponent} from './staff.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {SharedServicesModule} from '../../shared/shared-services.module';

const routes: Routes = [
  {path: '', component: StaffComponent}
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    StaffComponent
  ]
})
export class StaffModule {
}
