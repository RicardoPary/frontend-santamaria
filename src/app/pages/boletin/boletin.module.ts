import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoletinRoutingModule } from './boletin-routing.module';
import {FormsModule} from '@angular/forms';
import {NgBusyModule} from 'ng-busy';
import {BoletinComponent} from './boletin.component';
import {MateriaService} from '../../shared/services/materia.service';
import {BimestreService} from '../../shared/services/bimestre.service';
import {CursoService} from '../../shared/services/curso.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgBusyModule,
    BoletinRoutingModule
  ],
  declarations: [
    BoletinComponent
  ],
  providers:[
    BimestreService,
    CursoService,
    MateriaService
  ]
})
export class BoletinModule { }
