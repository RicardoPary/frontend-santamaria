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
        loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule'
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
        path: 'attentions-list',
        loadChildren: 'app/pages/patient/attentions-list/attentions-list.module#AttentionsListModule'
      },
      {
        path: 'medical-history',
        loadChildren: 'app/pages/patient/medical-history/medical-history.module#MedicalHistoryModule'
      },
      {
        path: 'input-details',
        loadChildren: 'app/pages/patient/input-details/input-details.module#InputDetailsModule'
      },
      {
        path: 'patient-list',
        loadChildren: 'app/pages/patient/patient-list/patient-list.module#PatientListModule'
      },
      {
        path: 'contract-list',
        loadChildren: 'app/pages/staff/contract-list/contract-list.module#ContractListModule'
      },
      {
        path: 'staff-list',
        loadChildren: 'app/pages/staff/staff-list/staff-list.module#StaffListModule'
      },
      {
        path: 'assign-role',
        loadChildren: 'app/pages/user/assign-role/assign-role.module#AssignRoleModule'
      },
      {
        path: 'role-list',
        loadChildren: 'app/pages/user/role-list/role-list.module#RoleListModule'
      },
      {
        path: 'user-list',
        loadChildren: 'app/pages/user/user-list/user-list.module#UserListModule'
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
