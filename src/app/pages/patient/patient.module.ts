import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import {FormsModule} from '@angular/forms';
import {NgBusyModule} from 'ng-busy';
import {PatientComponent} from './patient.component';
import {MateriaService} from '../../shared/services/materia.service';
import {BimestreService} from '../../shared/services/bimestre.service';
import {CursoService} from '../../shared/services/curso.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgBusyModule,
    PatientRoutingModule
  ],
  declarations: [
    PatientComponent
  ],
  providers:[
    BimestreService,
    CursoService,
    MateriaService
  ]
})
export class PatientModule { }
