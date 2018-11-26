import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceDetailModalComponent} from './assign-detail-popup.component';
import {AssignComponent} from './assign.component';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';

export const routes: Routes = [
  {path: '', component: AssignComponent},
  {path: 'detail/:id/:x_data', component: InvoiceDetailModalComponent}
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AssignComponent,
    InvoiceDetailModalComponent
  ]
})
export class AssignModule {
}
