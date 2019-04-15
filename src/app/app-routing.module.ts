import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { authRoutes } from './pages/auth/auth.routing';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/pages/dashboard/dashboard-statistics/dashboard-statistics.module#DashboardStatisticsModule',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/all-in-one',
        loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'dashboard/crm',
        loadChildren: 'app/pages/dashboard/dashboard-crm/dashboard-crm.module#DashboardCrmModule'
      },
      {
        path: 'medical-history',
        loadChildren: 'app/pages/medical-history/medical-history.module#MedicalHistoryModule'
      },
      {
        path: 'inventory',
        loadChildren: 'app/pages/inventory/inventory.module#InventoryModule'
      },
      {
        path: 'supply',
        loadChildren: 'app/pages/supply/supply.module#SupplyModule'
      },
      {
        path: 'patient',
        loadChildren: 'app/pages/patient/patient.module#PatientModule'
      },
      {
        path: 'staff',
        loadChildren: 'app/pages/staff/staff.module#StaffModule'
      },
      {
        path: 'report',
        loadChildren: 'app/pages/report/report.module#ReportModule'
      },
      {
        path: 'role',
        loadChildren: 'app/pages/role/role.module#RoleModule'
      },
      {
        path: 'user',
        loadChildren: 'app/pages/user/user.module#UserModule'
      },
      {
        path: 'category',
        loadChildren: 'app/pages/category/category.module#CategoryModule'
      },
      {
        path: 'category-details/:idBranch/:idCategory',
        loadChildren: 'app/pages/category-details/category-details.module#CategoryDetailsModule'
      },
      {
        path: 'consultation',
        loadChildren: 'app/pages/consultation/consultation.module#ConsultationModule'
      },
      {
        path: 'nurse',
        loadChildren: 'app/pages/nurse/nurse.module#NurseModule'
      }
    ]
  },
  {
    path: 'auth',
    children: [
      ...authRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
