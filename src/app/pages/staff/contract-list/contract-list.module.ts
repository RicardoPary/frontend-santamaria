import {NgModule} from '@angular/core';
import {ContractListComponent} from './contract-list.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../../shared/shared-libs.module';
import {SharedServicesModule} from '../../../shared/shared-services.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollbarModule} from '../../../core/scrollbar/scrollbar.module';
import {PageHeaderModule} from '../../../core/page-header/page-header.module';
import {BreadcrumbsModule} from '../../../core/breadcrumbs/breadcrumbs.module';
import {SharedMaterialModule} from '../../../shared/shared-material.module';

const routes: Routes = [
  {path: '', component: ContractListComponent}
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
    ContractListComponent
  ]
})
export class ContractListModule {
}
