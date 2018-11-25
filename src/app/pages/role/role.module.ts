import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {ReunionService} from '../../shared/services/reunion.service';
import {RoleComponent} from './role.component';
import {RoleRoutingModule} from './role-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RoleRoutingModule
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
