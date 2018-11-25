import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceDetailModalComponent} from './invoice-detail-popup.component';
import {InvoiceComponent} from './invoice.component';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';

export const routes: Routes = [
  {path: '', component: InvoiceComponent},
  {path: 'detail/:id/:x_data', component: InvoiceDetailModalComponent}
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InvoiceComponent,
    InvoiceDetailModalComponent
  ]
})
export class InvoiceModule {
}
