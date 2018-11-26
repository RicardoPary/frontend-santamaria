import {NgModule} from '@angular/core';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {PagesComponent} from './pages.component';
import {SidebarComponent} from '../shared/components/sidebar/sidebar.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from '../shared/shared-libs.module';
import {SharedServicesModule} from '../shared/shared-services.module';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'dashboard'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'medical-history', loadChildren: './medical-history/medical-history.module#MedicalHistoryModule'},
      {path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule'},
      {path: 'supply', loadChildren: './supply/supply.module#SupplyModule'},
      {path: 'patient', loadChildren: './patient/patient.module#PatientModule'},
      {path: 'staff', loadChildren: './staff/staff.module#StaffModule'},
      {path: 'report', loadChildren: './report/report.module#ReportModule'},
      {path: 'role', loadChildren: './role/role.module#RoleModule'},
      {path: 'user', loadChildren: './user/user.module#UserModule'},
      {path: 'charts', loadChildren: './charts/charts.module#ChartsModule'},
      {path: 'category', loadChildren: './category/category.module#CategoryModule'},
      {
        path: 'category-details/:idBranch/:idCategory',
        loadChildren: './category-details/category-details.module#CategoryDetailsModule'
      },
      {path: 'consultation', loadChildren: './consultation/consultation.module#ConsultationModule'},
      {path: 'nurse', loadChildren: './nurse/nurse.module#NurseModule'}
    ]
  }
];

@NgModule({
  imports: [
    SharedLibsModule,
    SharedServicesModule,
    RouterModule.forChild(routes),
    NgbDropdownModule.forRoot(),
    NgbCollapseModule
  ],
  declarations: [
    PagesComponent,
    SidebarComponent,
    HeaderComponent
  ]
})
export class PagesModule {
}
