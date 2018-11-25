import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupplyRoutingModule} from './supply-routing.module';
import {SupplyComponent} from './supply.component';
import {FormsModule} from '@angular/forms';
import {BimestreService} from '../../shared/services/bimestre.service';
import {CursoService} from '../../shared/services/curso.service';
import {MateriaService} from '../../shared/services/materia.service';
import {NgBusyModule} from 'ng-busy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SupplyRoutingModule,
    NgBusyModule
  ],
  declarations: [
    SupplyComponent
  ],
  providers: [
    BimestreService,
    CursoService,
    MateriaService
  ]
})
export class SupplyModule {
}
