import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoryComponent} from './category.component';
import {SharedModule} from '../../shared/shared.module';
import {CategoryService} from '../../shared/service/category.service';
import {NgBusyModule} from 'ng-busy';
import {ProductService} from '../../shared/service/product.service';

export const routes: Routes = [
  {path: '', component: CategoryComponent}
];

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    NgbModalModule,
    RouterModule.forChild(routes),
    NgBusyModule
  ],
  declarations: [
    CategoryComponent
  ],
  providers: [
    CategoryService,
    NgbActiveModal,
    ProductService
  ]
})
export class CategoryModule {
}
