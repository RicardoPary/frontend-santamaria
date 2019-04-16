import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list.component';
import {SharedLibsModule} from '../../../shared/shared-libs.module';
import {SharedServicesModule} from '../../../shared/shared-services.module';
import {SharedMaterialModule} from '../../../shared/shared-material.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollbarModule} from '../../../core/scrollbar/scrollbar.module';
import {PageHeaderModule} from '../../../core/page-header/page-header.module';
import {BreadcrumbsModule} from '../../../core/breadcrumbs/breadcrumbs.module';
import {AccountService} from '../../../shared/services/account.service';

export const routes: Routes = [
  {path: '', component: UserListComponent}
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    SharedMaterialModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserListComponent
  ],
  providers:[
    AccountService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserListModule {
}
