import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ActividadCivicaComponent} from './actividad-civica.component';

const routes: Routes = [
  {
    path: '',
    component: ActividadCivicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadCivicaRoutingModule {
}
