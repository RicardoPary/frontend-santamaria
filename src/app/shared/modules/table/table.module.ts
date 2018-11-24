import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilterColumnComponent} from './filter-column.component';
import {TableComponent} from './table.component';
import {FieldTypeComponent} from './field-type.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FilterColumnComponent,
    TableComponent,
    FieldTypeComponent
  ],
  exports: [
    FilterColumnComponent,
    TableComponent
  ]
})
export class TableModule {
}
