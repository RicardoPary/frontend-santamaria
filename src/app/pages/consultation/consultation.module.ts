import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceDetailModalComponent} from './consultation-detail-popup.component';
import {ConsultationComponent} from './consultation.component';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';

export const routes: Routes = [
  {path: '', component: ConsultationComponent},
  {path: 'detail/:id/:x_data', component: InvoiceDetailModalComponent}
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ConsultationComponent,
    InvoiceDetailModalComponent
  ]
})
export class ConsultationModule {
}
