import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerErrorComponent } from './server-error.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ServerErrorComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServerErrorComponent]
})
export class ServerErrorModule { }
