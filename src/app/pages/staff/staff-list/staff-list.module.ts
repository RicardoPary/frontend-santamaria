import {NgModule} from '@angular/core';
import {StaffListComponent} from './staff-list.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../../shared/shared-libs.module';
import {SharedServicesModule} from '../../../shared/shared-services.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollbarModule} from '../../../core/scrollbar/scrollbar.module';
import {PageHeaderModule} from '../../../core/page-header/page-header.module';
import {BreadcrumbsModule} from '../../../core/breadcrumbs/breadcrumbs.module';

const routes: Routes = [
  {path: '', component: StaffListComponent}
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    StaffListComponent
  ]
})
export class StaffListModule {
}
