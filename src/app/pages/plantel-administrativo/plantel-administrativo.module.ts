import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlantelAdministrativoRoutingModule} from './plantel-administrativo-routing.module';
import {PlantelAdministrativoComponent} from './plantel-administrativo.component';
import {PersonaService} from '../../shared/services/persona.service';
import {PlantelAdministrativoService} from '../../shared/services/plantel-administrativo.service';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PlantelAdministrativoRoutingModule
  ],
  declarations: [
    PlantelAdministrativoComponent
  ],
  providers: [
    PersonaService,
    PlantelAdministrativoService
  ]
})
export class PlantelAdministrativoModule { }
