import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportComponent} from './report.component';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {PersonaService} from '../../shared/services/persona.service';
import {DocenteService} from '../../shared/services/docente.service.';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportComponent
  ],
  providers: [
    PersonaService,
    DocenteService
  ]
})
export class ReportModule {
}
