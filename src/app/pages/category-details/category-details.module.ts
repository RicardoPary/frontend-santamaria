import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {CategoryDetailsComponent} from './category-details.component';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {SharedServicesModule} from '../../shared/shared-services.module';

export const routes: Routes = [
  {path: '', component: CategoryDetailsComponent}
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    NgbPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CategoryDetailsComponent
  ]
})
export class CategoryDetailsModule {
}
