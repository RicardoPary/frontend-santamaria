import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatSelectModule} from '@angular/material';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from './user.component';
import {SharedModule} from '../../shared/shared.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {UserService} from '../../shared/service/user.service';
import {RoleService} from '../../shared/service/role.service';
import {NgBusyModule} from 'ng-busy';
import {AccountService} from '../../shared/service/account.service';

export const routes: Routes = [
  {path: '', component: UserComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    TableModule,
    NgBusyModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    UserService,
    RoleService,
    AccountService
  ]
})
export class UserModule {
}
