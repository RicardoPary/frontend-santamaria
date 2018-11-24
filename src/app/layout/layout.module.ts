import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbProgressbarModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.componet';
import {SharedModule} from '../shared/shared.module';
import {KrakenService} from '../shared/service/kraken.service';
import {ReportService} from '../shared/service/report.service';

const LAYOUT_COMPONENT = [
  FooterComponent,
  NavbarComponent,
  SidebarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbProgressbarModule,
    NgbCollapseModule,
    SharedModule
  ],
  declarations: [
    ...LAYOUT_COMPONENT
  ],
  exports: [
    ...LAYOUT_COMPONENT
  ],
  providers: [
    KrakenService,
    ReportService
  ]
})
export class LayoutModule {
}
