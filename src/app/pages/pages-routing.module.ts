import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';

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
      {path: 'invoice', loadChildren: './invoice/invoice.module#InvoiceModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
