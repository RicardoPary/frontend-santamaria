import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'dashboard'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'charts', loadChildren: './charts/charts.module#ChartsModule'},
      {path: 'bimestre/:idCurso/:idDocente', loadChildren: './bimestre/bimestre.module#BimestreModule'},
      {path: 'estudiante/boletin/:idEstudiante', loadChildren: './boletin/boletin.module#BoletinModule'},
      {path: 'estudiante', loadChildren: './estudiante/estudiante.module#EstudianteModule'},
      {path: 'docente', loadChildren: './docente/docente.module#DocenteModule'},
      {path: 'tutor', loadChildren: './tutor/tutor.module#TutorModule'},
      {path: 'materia', loadChildren: './materia/materia.module#MateriaModule'},
      {path: 'horario', loadChildren: './horario/horario.module#HorarioModule'},
      {path: 'aula', loadChildren: './aula/aula.module#AulaModule'},
      {path: 'reunion', loadChildren: './reunion/reunion.module#ReunionModule'},
      {path: 'inscripcion', loadChildren: './inscripcion/inscripcion.module#InscripcionModule'},
      {path: 'curso', loadChildren: './curso/curso.module#CursoModule'},
      {path: 'actividad-civica', loadChildren: './actividad-civica/actividad-civica.module#ActividadCivicaModule'},
      {path: 'plantel-administrativo', loadChildren: './plantel-administrativo/plantel-administrativo.module#PlantelAdministrativoModule'},
      {path: 'user', loadChildren: './user/user.module#UserModule'},
      {path: 'category', loadChildren: './category/category.module#CategoryModule'},
      {
        path: 'category-details/:idBranch/:idCategory',
        loadChildren: './category-details/category-details.module#CategoryDetailsModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
