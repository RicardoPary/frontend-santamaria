import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {MedicalHistoryComponent} from './medical-history.component';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MedicalHistoryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule.forChild(routes)
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
