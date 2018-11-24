import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MateriaRoutingModule} from './materia-routing.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {FormsModule} from '@angular/forms';
import {MateriaComponent} from './materia.component';
import {MateriaService} from '../../shared/services/materia.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MateriaRoutingModule
  ],
  declarations: [
    MateriaComponent
  ],
  providers: [
    MateriaService
  ]
})
export class MateriaModule {
}
