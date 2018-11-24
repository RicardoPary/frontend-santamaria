import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EstudianteComponent} from './estudiante.component';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {EstudianteRoutingModule} from './estudiante-routing.module';
import {EstudianteService} from '../../shared/services/estudiante.service';
import {PersonaService} from '../../shared/services/persona.service';
import {NgBusyModule} from 'ng-busy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    EstudianteRoutingModule,
    NgBusyModule
  ],
  declarations: [
    EstudianteComponent
  ],
  providers: [
    EstudianteService,
    PersonaService
  ]
})
export class EstudianteModule { }
