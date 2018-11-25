import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../shared/modules/table/table.module';
import {FormsModule} from '@angular/forms';
import {InventoryComponent} from './inventory.component';
import {AulaService} from '../../shared/services/aula.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: InventoryComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule.forChild(routes)
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
