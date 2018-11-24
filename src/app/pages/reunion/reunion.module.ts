import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../shared/modules/table/table.module';
import {ReunionService} from '../../shared/services/reunion.service';
import {ReunionComponent} from './reunion.component';
import {ReunionRoutingModule} from './reunion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ReunionRoutingModule
  ],
  declarations: [
    ReunionComponent
  ],
  providers: [
    ReunionService
  ]
})
export class ReunionModule {
}
