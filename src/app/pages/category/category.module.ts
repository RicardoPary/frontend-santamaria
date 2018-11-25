import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoryComponent} from './category.component';
import {CategoryService} from '../../shared/services/category.service';
import {NgBusyModule} from 'ng-busy';
import {ProductService} from '../../shared/services/product.service';
import {CommonModule} from '@angular/common';
import {BranchService} from '../../shared/services/branch.service';

export const routes: Routes = [
  {path: '', component: CategoryComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    ProductService,
    BranchService
  ]
})
export class CategoryModule {
}
