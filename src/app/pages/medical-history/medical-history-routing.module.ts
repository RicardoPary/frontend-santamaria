import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MedicalHistoryComponent} from './medical-history.component';

const routes: Routes = [
  {
    path: '',
    component: MedicalHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalHistoryRoutingModule {
}
