import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../shared/service/product.service';
import {FormsModule} from '@angular/forms';
import {ClientService} from '../../shared/service/client.service';
import {PurchaseDetailsService} from '../../shared/service/purchase-details.service';
import {InvoiceService} from '../../shared/service/invoice.service';
import {InvoiceDetailModalComponent} from './invoice-detail-popup.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {KrakenService} from '../../shared/service/kraken.service';
import {InvoiceComponent} from './invoice.component';
import {BoxService} from '../../shared/service/box.service';
import {TextMaskModule} from 'angular2-text-mask';

export const routes: Routes = [
  {path: '', component: InvoiceComponent},
  {path: 'detail/:id/:x_data', component: InvoiceDetailModalComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatSlideToggleModule,
    TextMaskModule
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
