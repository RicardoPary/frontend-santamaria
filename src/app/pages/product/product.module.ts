import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatSelectModule} from '@angular/material';
import {NgbPaginationModule, NgbDatepickerModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from './product.component';
import {SharedModule} from '../../shared/shared.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {ProductService} from '../../shared/service/product.service';
import {CategoryService} from '../../shared/service/category.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgBusyModule} from 'ng-busy';

export const routes: Routes = [
  {path: '', component: ProductComponent}
];

@NgModule({
  imports: [
    MatSlideToggleModule,
    FormsModule,
    SharedModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbModalModule,
    TableModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    NgBusyModule
  ],
  declarations: [
    ProductComponent
  ],
  providers: [
    ProductService,
    CategoryService
  ]
})
export class ProductModule {
}
