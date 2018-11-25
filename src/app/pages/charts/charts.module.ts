import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule as Ng2Charts} from 'ng2-charts';

import {ChartsComponent} from './charts.component';
import {PageHeaderModule} from '../../shared/modules';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    Ng2Charts,
    PageHeaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChartsComponent]
})
export class ChartsModule {
}
