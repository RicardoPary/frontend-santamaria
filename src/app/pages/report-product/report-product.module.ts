import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {ReportProductComponent} from './report-product.component';
import {SharedModule} from '../../shared/shared.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {NgBusyModule} from 'ng-busy';
import {ReportService} from '../../shared/service/report.service';
import {BranchService} from '../../shared/service/branch.service';

export const routes: Routes = [
  {path: '', component: ReportProductComponent}
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
    ReportProductComponent
  ],
  providers: [
    ReportService
  ]
})
export class ReportProductModule {
}
