import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from './user.component';
import {TableModule} from '../../shared/modules/table/table.module';
import {UserService} from '../../shared/services/user.service';
import {RoleService} from '../../shared/services/role.service';
import {NgBusyModule} from 'ng-busy';
import {AccountService} from '../../shared/services/account.service';
import {BranchService} from '../../shared/services/branch.service';
import {LoaderService} from '../../shared/components/loader/loader.service';

export const routes: Routes = [
  {path: '', component: UserComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    RouterModule.forChild(routes),
    TableModule,
    NgBusyModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    UserService,
    RoleService,
    AccountService,
    BranchService,
    LoaderService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserModule {
}
