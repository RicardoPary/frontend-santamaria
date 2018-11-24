import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ImageCropperModule} from 'ng2-img-cropper';
import {FileUploadModule} from 'ng2-file-upload';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './interceptor';
import {AccountService, AuthServerProvider, AuthService, CSRFService, Principal, StateStorageService} from './auth';
import {UserService} from './user/user.service';
import {VulSortDirective} from './directives/vul-sort.directive';
import {VulSortByDirective} from './directives/vul-sort-by.directive';
import {UtilsService} from './service/utils.service';
import {VulPasswordStrengthBarComponent} from './components/vul-password-strength-bar.component';
import {VulFocusDirective} from './directives/vul-focus.directive';
import {CompanyService} from './service/company.service';
import {VulDateStringMonthPipe} from './pipe/vul-date-string-month.pipe';
import {EconomicActivityService} from './service/economicActivity.service';
import {CropperModalComponent} from './components/modal-cropper.component';
import {VulRouterLinkDirective} from './directives/vul-router-link.directive';
import {VulAlertService} from './alert/vul-alert.service';
import {LoginService} from './service/login.service';
import {RoleService} from './service/role.service';
import {UserIntegrationService} from './service/user-integration.service';
import {KraSortDirective} from './directives/sort/sort.directive';
import {KraSortByDirective} from './directives/sort/sort-by.directive';
import {KraItemCountComponent} from './components/count/item-count.component';
import {InputSearchComponent} from './components/input-search/input-search.component';
import {KraOnlyNumber} from './directives/input/only-number.directive';
import {ImagePreviewDirective} from './directives/image-preview.directive';
import {InvoiceDetailComponent} from './components/invoice-detail.component';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    FileUploadModule,
    ImageCropperModule,
    NgbModule
  ],
  declarations: [
    KraOnlyNumber,
    KraItemCountComponent,
    InvoiceDetailComponent,
    KraSortDirective,
    KraSortByDirective,
    VulSortDirective,
    VulSortByDirective,
    VulFocusDirective,
    VulDateStringMonthPipe,
    VulPasswordStrengthBarComponent,
    CropperModalComponent,
    VulRouterLinkDirective,
    InputSearchComponent,
    ImagePreviewDirective
  ],
  entryComponents: [
    CropperModalComponent
  ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }],
    AccountService,
    AuthService,
    AuthServerProvider,
    CSRFService,
    Principal,
    StateStorageService,
    UserService,
    LoginService,
    VulAlertService,
    RoleService,
    UtilsService,
    CompanyService,
    EconomicActivityService,
    UserIntegrationService
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    KraOnlyNumber,
    KraItemCountComponent,
    KraSortDirective,
    KraSortByDirective,
    VulSortDirective,
    VulSortByDirective,
    VulPasswordStrengthBarComponent,
    VulFocusDirective,
    VulDateStringMonthPipe,
    FileUploadModule,
    CropperModalComponent,
    NgbModule,
    VulRouterLinkDirective,
    InputSearchComponent,
    ImagePreviewDirective
  ]
})
export class SharedModule {
}
