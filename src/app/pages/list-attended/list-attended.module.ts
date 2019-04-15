import {NgModule} from '@angular/core';
import {ListAttendedComponent} from './list-attended.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {Core2Module} from '../../core2';
import {SharedMaterialModule} from '../../shared/shared-material.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollbarModule} from '../../core/scrollbar/scrollbar.module';
import {PageHeaderModule} from '../../core/page-header/page-header.module';
import {BreadcrumbsModule} from '../../core/breadcrumbs/breadcrumbs.module';

const routes: Routes = [
  {
    path: '', component: ListAttendedComponent
  }
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
    ListAttendedComponent
  ]
})
export class ListAttendedModule {
}
