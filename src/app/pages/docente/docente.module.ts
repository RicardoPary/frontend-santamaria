import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocenteComponent} from './docente.component';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {DocenteRoutingModule} from './docente-routing.module';
import {PersonaService} from '../../shared/services/persona.service';
import {DocenteService} from '../../shared/services/docente.service.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DocenteRoutingModule
  ],
  declarations: [
    DocenteComponent
  ],
  providers: [
    PersonaService,
    DocenteService
  ]
})
export class DocenteModule { }
