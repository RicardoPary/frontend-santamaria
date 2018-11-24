import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AulaRoutingModule} from './aula-routing.module';
import {TableModule} from '../../shared/modules/table/table.module';
import {FormsModule} from '@angular/forms';
import {AulaComponent} from './aula.component';
import {AulaService} from '../../shared/services/aula.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    AulaRoutingModule
  ],
  declarations: [
    AulaComponent
  ],
  providers: [
    AulaService
  ]
})
export class AulaModule {
}
