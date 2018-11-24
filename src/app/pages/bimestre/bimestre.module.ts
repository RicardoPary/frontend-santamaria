import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BimestreRoutingModule} from './bimestre-routing.module';
import {BimestreComponent} from './bimestre.component';
import {FormsModule} from '@angular/forms';
import {BimestreService} from '../../shared/services/bimestre.service';
import {CursoService} from '../../shared/services/curso.service';
import {MateriaService} from '../../shared/services/materia.service';
import {NgBusyModule} from 'ng-busy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BimestreRoutingModule,
    NgBusyModule
  ],
  declarations: [
    BimestreComponent
  ],
  providers: [
    BimestreService,
    CursoService,
    MateriaService
  ]
})
export class BimestreModule {
}
