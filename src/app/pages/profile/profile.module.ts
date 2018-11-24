import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

/**
 * Created by Villca Soliz Bismarck.
 */

export const routes: Routes = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbTabsetModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: []
})
export class ProfileModule {
}
