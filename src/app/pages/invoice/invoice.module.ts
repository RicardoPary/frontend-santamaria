import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../shared/services/product.service';
import {FormsModule} from '@angular/forms';
import {ClientService} from '../../shared/services/client.service';
import {PurchaseDetailsService} from '../../shared/services/purchase-details.service';
import {InvoiceService} from '../../shared/services/invoice.service';
import {InvoiceDetailModalComponent} from './invoice-detail-popup.component';
import {KrakenService} from '../../shared/services/kraken.service';
import {InvoiceComponent} from './invoice.component';
import {BoxService} from '../../shared/services/box.service';

export const routes: Routes = [
  {path: '', component: InvoiceComponent},
  {path: 'detail/:id/:x_data', component: InvoiceDetailModalComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    InvoiceComponent,
    InvoiceDetailModalComponent
  ],
  providers: [
    ProductService,
    ClientService,
    PurchaseDetailsService,
    InvoiceService,
    KrakenService,
    BoxService
  ]
})
export class InvoiceModule {
}
