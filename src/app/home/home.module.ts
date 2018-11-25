import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../shared/shared-libs.module';
import {SharedServicesModule} from '../shared/shared-services.module';
import {CoreModule} from '../core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    CoreModule,
    RouterModule.forChild(routes),
    NgbCarouselModule.forRoot()
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
