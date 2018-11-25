import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {SidebarComponent} from '../shared/components/sidebar/sidebar.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {CuentaService} from '../shared/services/cuenta.service';
import {MateriaService} from '../shared/services/materia.service';


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbDropdownModule.forRoot(),
    NgbCollapseModule
  ],
  declarations: [
    PagesComponent,
    SidebarComponent,
    HeaderComponent
  ],
  providers: [
    CuentaService,
    MateriaService
  ]
})
export class PagesModule {
}

