import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportComponent} from './report.component';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {ReportRoutingModule} from './report-routing.module';
import {PersonaService} from '../../shared/services/persona.service';
import {DocenteService} from '../../shared/services/docente.service.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ReportRoutingModule
  ],
  declarations: [
    ReportComponent
  ],
  providers: [
    PersonaService,
    DocenteService
  ]
})
export class ReportModule { }
