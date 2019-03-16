import {NgModule} from '@angular/core';
import {ReportComponent} from './report.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {SharedServicesModule} from '../../shared/shared-services.module';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent
  }
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule {
}
