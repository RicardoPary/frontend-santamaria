import {NgModule} from '@angular/core';
import {PatientComponent} from './patient.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';

const routes: Routes = [
  {
    path: '', component: PatientComponent
  }
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PatientComponent
  ]
})
export class PatientModule {
}
