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
  TypeAttentionService
} from './services';

import {RequestInterceptor} from './blocks/intercertor/request.interceptor';
import {AlertService} from './components/alert/alert.service';

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
    AlertService
  ]
})
export class SharedServicesModule {
}
