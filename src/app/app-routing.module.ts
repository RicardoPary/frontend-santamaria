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
        path: 'dashboard/crm',
        loadChildren: 'app/pages/dashboard/dashboard-crm/dashboard-crm.module#DashboardCrmModule'
      },
      {
        path: 'forms',
        loadChildren: 'app/pages/forms/forms.module#FormModule'
      },
      {
        path: 'pages/profile',
        loadChildren: 'app/pages/profile/profile.module#ProfileModule'
      },
      {
        path: 'tables/simple-table',
        loadChildren: 'app/pages/tables/simple-table/simple-table.module#SimpleTableModule'
      },
      {
        path: 'tables/table-pagination',
        loadChildren: 'app/pages/tables/table-pagination/table-pagination.module#TablePaginationModule'
      },
      {
        path: 'tables/table-sorting',
        loadChildren: 'app/pages/tables/table-sorting/table-sorting.module#TableSortingModule'
      },
      {
        path: 'tables/table-filtering',
        loadChildren: 'app/pages/tables/table-filtering/table-filtering.module#TableFilteringModule'
      },
      {
        path: 'tables/datatable',
        loadChildren: 'app/pages/tables/datatable/datatable.module#DatatableModule'
      },
      {
        path: 'tables/all-in-one-table',
        loadChildren: 'app/pages/tables/all-in-one-table/all-in-one-table.module#AllInOneTableModule'
      },
      {
        path: 'pages/projects',
        loadChildren: 'app/pages/projects/projects.module#ProjectsModule'
      },
      {
        path: 'pages/project-details',
        loadChildren: 'app/pages/project-details/project-details.module#ProjectDetailsModule'
      },
      {
        path: 'editor',
        loadChildren: 'app/pages/editor/editor.module#EditorModule'
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
export class AppRoutingModule {
}
