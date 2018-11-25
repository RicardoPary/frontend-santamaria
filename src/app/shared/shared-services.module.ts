import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {
  CuentaService,
  CategoryService,
  RoleService,
  UserService,
  StaffService,
  PatientService,
  ConsultationService,
  ConsultationDetailsService,
  ContractService,
  InventoryService,
  MedicalHistoryService,
  TypeAttentionService,
  SupplyService,
  ProviderService
} from './services';

import {RequestInterceptor} from './blocks/intercertor/request.interceptor';
import {AlertService} from './components/alert/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoaderService} from './components/loader/loader.service';

@NgModule({
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true,
      }
    ],
    CuentaService,
    CategoryService,
    RoleService,
    UserService,
    StaffService,
    PatientService,
    ConsultationService,
    ConsultationDetailsService,
    ContractService,
    InventoryService,
    MedicalHistoryService,
    TypeAttentionService,
    SupplyService,
    AlertService,
    ProviderService,
    NgbActiveModal,
    LoaderService
  ]
})
export class SharedServicesModule {
}
