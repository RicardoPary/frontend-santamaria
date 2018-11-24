import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './pages.routing';
import {Pages} from './pages.component';
import {LayoutModule} from '../layout/layout.module';
import {PagesGuard} from './pages.guard';
import {UserBindService} from '../shared/service/userBind.service';
import {CompanyBindService} from '../shared/service/companyBind.service';
import {ErrorComponent} from '../layout/error/error.component';
import {BranchService} from '../shared/service/branch.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    routing
  ],
  declarations: [
    Pages,
    ErrorComponent
  ],
  providers: [
    PagesGuard,
    UserBindService,
    CompanyBindService,
    BranchService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
}
