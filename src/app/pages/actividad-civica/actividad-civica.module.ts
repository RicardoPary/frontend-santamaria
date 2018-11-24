import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {ActividadCivicaRoutingModule} from './actividad-civica-routing.module';
import {ActividadCivicaComponent} from './actividad-civica.component';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ActividadCivicaRoutingModule
  ],
  declarations: [
    ActividadCivicaComponent
  ],
  providers: [
    ActividadCivicaService
  ]
})
export class ActividadCivicaModule {
}
