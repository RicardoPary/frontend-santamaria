import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionRoutingModule } from './inscripcion-routing.module';
import {InscripcionComponent} from './inscripcion.component';
import {InscripcionService} from '../../shared/services/inscripcion.service';
import {EstudianteService} from '../../shared/services/estudiante.service';
import {TableModule} from '../../shared/modules/table/table.module';
import {FormsModule} from '@angular/forms';
import {PersonaService} from '../../shared/services/persona.service';
import {CursoService} from '../../shared/services/curso.service';
import {BimestreService} from '../../shared/services/bimestre.service';
import {MateriaService} from '../../shared/services/materia.service';

@NgModule({
  imports: [
    CommonModule,
    InscripcionRoutingModule,
    TableModule,
    FormsModule
  ],
  declarations: [
    InscripcionComponent
  ],
  providers: [
    InscripcionService,
    EstudianteService,
    PersonaService,
    CursoService,
    BimestreService,
    MateriaService
  ]
})
export class InscripcionModule { }
