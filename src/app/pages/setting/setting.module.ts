import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SettingComponent } from './setting.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

/**
 * Created by Villca Soliz Bismarck.
 */

export const routes: Routes = [
  { path: '', component: SettingComponent }
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
    SettingComponent
  ],
  providers: []
})
export class SettingModule {
}
