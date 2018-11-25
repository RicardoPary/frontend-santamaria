import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from '../../shared/modules/table/table.module';
import {FormsModule} from '@angular/forms';
import {StaffComponent} from './staff.component';
import {StaffRoutingModule} from './staff-routing.module';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';
import {CursoService} from '../../shared/services/curso.service';
import {MateriaService} from '../../shared/services/materia.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    StaffRoutingModule
  ],
  declarations: [
    StaffComponent
  ],
  providers: [
    ActividadCivicaService,
    CursoService,
    MateriaService
  ]
})
export class StaffModule { }
