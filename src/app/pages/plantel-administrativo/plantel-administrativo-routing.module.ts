import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantelAdministrativoComponent } from './plantel-administrativo.component';

const routes: Routes = [
  {
    path: '',
    component: PlantelAdministrativoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantelAdministrativoRoutingModule {}
