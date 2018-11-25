import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupplyComponent} from './supply.component';
import {FormsModule} from '@angular/forms';
import {BimestreService} from '../../shared/services/bimestre.service';
import {CursoService} from '../../shared/services/curso.service';
import {MateriaService} from '../../shared/services/materia.service';
import {NgBusyModule} from 'ng-busy';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: SupplyComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
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
