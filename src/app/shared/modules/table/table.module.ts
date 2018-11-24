import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilterColumnComponent} from './filter-column.component';
import {TableComponent} from './table.component';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    FilterColumnComponent,
    TableComponent
  ],
  exports: [
    FilterColumnComponent,
    TableComponent
  ]
})
export class TableModule {
}
