import {NgModule} from '@angular/core';
import {InventoryComponent} from './inventory.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {SharedServicesModule} from '../../shared/shared-services.module';

const routes: Routes = [
  {path: '', component: InventoryComponent}
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InventoryComponent
  ]
})
export class InventoryModule {
}
