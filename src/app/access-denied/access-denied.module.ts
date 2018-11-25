import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeniedComponent } from './access-denied.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AccessDeniedComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccessDeniedComponent]
})
export class AccessDeniedModule { }
