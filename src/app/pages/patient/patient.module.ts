import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {NgBusyModule} from 'ng-busy';
import {PatientComponent} from './patient.component';
import {MateriaService} from '../../shared/services/materia.service';
import {BimestreService} from '../../shared/services/bimestre.service';
import {CursoService} from '../../shared/services/curso.service';
import {TableModule} from '../../shared/modules/table/table.module';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: PatientComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgBusyModule,
    TableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PatientComponent
  ],
  providers: [
    BimestreService,
    CursoService,
    MateriaService,
    ActividadCivicaService
  ]
})
export class PatientModule {
}
