import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {ReunionService} from '../../shared/services/reunion.service';
import {RoleComponent} from './role.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RoleComponent
  ],
  providers: [
    ReunionService
  ]
})
export class RoleModule {
}
