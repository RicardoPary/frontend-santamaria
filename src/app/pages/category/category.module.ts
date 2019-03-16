import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './category.component';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';

export const routes: Routes = [
  {path: '', component: CategoryComponent}
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CategoryComponent
  ]
})
export class CategoryModule {
}
