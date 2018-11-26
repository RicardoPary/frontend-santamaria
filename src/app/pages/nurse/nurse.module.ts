import {NgModule} from '@angular/core';
import {NurseComponent} from './nurse.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../../shared/shared-libs.module';
import {SharedServicesModule} from '../../shared/shared-services.module';

const routes: Routes = [
  {path: '', component: NurseComponent}
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NurseComponent
  ]
})
export class NurseModule {
}
