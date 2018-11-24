import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InventoryComponent} from './inventory.component';
import {TableModule} from '../../shared/modules/table/table.module';
import {InventoryService} from '../../shared/service/inventory.service';
import {ProductService} from '../../shared/service/product.service';
import {CategoryService} from '../../shared/service/category.service';
import {ProviderService} from '../../shared/service/provider.service';
import {NgBusyModule} from 'ng-busy';

export const routes: Routes = [
  {path: '', component: InventoryComponent}
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    RouterModule.forChild(routes),
    NgBusyModule
  ],
  declarations: [
    InventoryComponent
  ],
  providers: [
    InventoryService,
    ProductService,
    CategoryService,
    ProviderService
  ]
})
export class InventoryModule {
}
