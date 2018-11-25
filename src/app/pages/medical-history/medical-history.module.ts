import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {MedicalHistoryRoutingModule} from './medical-history-routing.module';
import {MedicalHistoryComponent} from './medical-history.component';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MedicalHistoryRoutingModule
  ],
  declarations: [
    MedicalHistoryComponent
  ],
  providers: [
    ActividadCivicaService
  ]
})
export class MedicalHistoryModule {
}
