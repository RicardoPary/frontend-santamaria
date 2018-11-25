import {NgModule} from '@angular/core';
import {MedicalHistoryComponent} from './medical-history.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {SharedServicesModule} from '../../shared/shared-services.module';

const routes: Routes = [
  {
    path: '',
    component: MedicalHistoryComponent
  }
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MedicalHistoryComponent
  ]
})
export class MedicalHistoryModule {
}
