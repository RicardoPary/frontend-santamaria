import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModalModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule} from '@angular/material';

import {ProductEnterComponent} from './product-enter.component';
import {SharedModule} from '../../shared/shared.module';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {CategoryService} from '../../shared/service/category.service';
import {ProductService} from '../../shared/service/product.service';
import {InventoryService} from '../../shared/service/inventory.service';
import {ProviderService} from '../../shared/service/provider.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const routes: Routes = [
  {path: '', component: ProductEnterComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
    NgbModalModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  declarations: [
    ProductEnterComponent
  ],
  entryComponents: [
    ProductEnterComponent
  ],
  providers: [
    CategoryService,
    ProductService,
    InventoryService,
    ProviderService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ProductEnterModule {
}
