import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbAccordionModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';

import { InvoiceService } from '../../shared/service/invoice.service';
import { ProductService } from '../../shared/service/product.service';
import { BoxService } from '../../shared/service/box.service';
import {NgBusyModule} from 'ng-busy';
import {ReportService} from '../../shared/service/report.service';

export const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    FormsModule,
    NgbTabsetModule,
    SharedModule,
    NgbAccordionModule,
    RouterModule.forChild(routes),
    NgBusyModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    InvoiceService,
    ProductService,
    BoxService,
    ReportService
  ]
})
export class DashboardModule {
}
