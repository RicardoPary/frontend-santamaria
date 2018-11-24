import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {ReportUserComponent} from './report-user.component';
import {SharedModule} from '../../shared/shared.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {NgBusyModule} from 'ng-busy';
import { InvoiceService } from '../../shared/service/invoice.service';
import {ReportService} from '../../shared/service/report.service';

export const routes: Routes = [
  {path: '', component: ReportUserComponent}
];

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    TableModule,
    NgBusyModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportUserComponent
  ],
  providers: [
    InvoiceService,
    ReportService
  ]
})
export class ReportUserModule {
}
