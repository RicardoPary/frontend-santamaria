import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryRoutingModule} from './inventory-routing.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {FormsModule} from '@angular/forms';
import {InventoryComponent} from './inventory.component';
import {AulaService} from '../../shared/services/aula.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InventoryRoutingModule
  ],
  declarations: [
    InventoryComponent
  ],
  providers: [
    AulaService
  ]
})
export class InventoryModule {
}
