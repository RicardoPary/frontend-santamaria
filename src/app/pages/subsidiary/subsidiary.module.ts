import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SubsidiaryComponent } from './subsidiary.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

export const routes: Routes = [
  { path: '', component: SubsidiaryComponent }
];

@NgModule({
  imports: [
    FormsModule,
    NgbTabsetModule,
    SharedModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SubsidiaryComponent
  ],
  providers: []
})
export class SubsidiaryModule {
}
