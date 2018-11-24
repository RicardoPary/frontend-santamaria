import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReunionComponent} from './reunion.component';

const routes: Routes = [
  {
    path: '',
    component: ReunionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReunionRoutingModule {
}
