import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HorarioRoutingModule} from './horario-routing.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {FormsModule} from '@angular/forms';
import {HorarioComponent} from './horario.component';
import {HorarioService} from '../../shared/services/horario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    HorarioRoutingModule
  ],
  declarations: [
    HorarioComponent
  ],
  providers: [
    HorarioService
  ]
})
export class HorarioModule {
}
