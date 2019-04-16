import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './core/layout/layout.component';
import {authRoutes} from './pages/auth/auth.routing';

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
        path: 'medical-history',
        loadChildren: 'app/pages/medical-history/medical-history.module#MedicalHistoryModule'
      },
      {
        path: 'list-attended',
        loadChildren: 'app/pages/list-attended/list-attended.module#ListAttendedModule'
      },
      {
        path: 'input-list',
        loadChildren: 'app/pages/inventory/input-list/input-list.module#InputListModule'
      },
      {
        path: 'list-inventories',
        loadChildren: 'app/pages/inventory/list-inventories/list-inventories.module#ListInventoriesModule'
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
        path: 'staff-list',
        loadChildren: 'app/pages/staff/staff-list/staff-list.module#StaffListModule'
      },
      {
        path: 'contract-list',
        loadChildren: 'app/pages/staff/contract-list/contract-list.module#ContractListModule'
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
export class AppRoutingModule {
}
