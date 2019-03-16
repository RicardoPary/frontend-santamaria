import {NgModule} from '@angular/core';
import {SupplyComponent} from './supply.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedServicesModule} from '../../shared/shared-services.module';
import {SharedLibsModule} from '../../shared/shared-libs.module';

const routes: Routes = [
  {
    path: '', component: SupplyComponent
  }
];

@NgModule({
  imports: [
    SharedServicesModule,
    SharedLibsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SupplyComponent
  ]
})
export class SupplyModule {
}
