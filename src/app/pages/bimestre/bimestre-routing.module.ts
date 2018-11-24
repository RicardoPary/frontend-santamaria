import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BimestreComponent} from './bimestre.component';

const routes: Routes = [
  {
    path: '', component: BimestreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BimestreRoutingModule {
}
