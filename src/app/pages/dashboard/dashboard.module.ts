import {NgModule} from '@angular/core';
import {NgbCarouselModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {DashboardComponent} from './dashboard.component';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';

import {PushComponent} from '../../shared/components/push.component';
import {StatModule} from '../../shared/modules';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../shared/shared-libs.module';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  }
];

@NgModule({
  imports: [
    SharedLibsModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    StatModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DashboardComponent,
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    PushComponent
  ]
})
export class DashboardModule {
}
