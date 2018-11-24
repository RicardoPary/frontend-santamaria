import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TutorComponent} from './tutor.component';
import {TutorRoutingModule} from './tutor-routing.module';
import {FormsModule} from '@angular/forms';
import {TutorService} from '../../shared/services/tutor.service';
import {PersonaService} from '../../shared/services/persona.service';
import {TableModule} from '../../shared/modules/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TutorRoutingModule
  ],
  declarations: [
    TutorComponent
  ],
  providers: [
    TutorService,
    PersonaService
  ]
})
export class TutorModule { }
