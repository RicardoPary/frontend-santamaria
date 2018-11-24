import {RouterModule, Routes} from '@angular/router';
import {Pages} from './pages.component';
import {errorRoute} from '../layout/error/error.route';
import {PagesGuard} from './pages.guard';

export const routes: Routes = [
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'invoice', canActivate: [PagesGuard], loadChildren: './invoice/invoice.module#InvoiceModule'},
  {
    path: 'pages', canActivate: [PagesGuard], component: Pages,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', canActivate: [PagesGuard], loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'profile', canActivate: [PagesGuard], loadChildren: './profile/profile.module#ProfileModule'},
      {path: 'category', canActivate: [PagesGuard], loadChildren: './category/category.module#CategoryModule'},
      {
        path: 'category-details/:idBranch/:idCategory',
        loadChildren: './category-details/category-details.module#CategoryDetailsModule'
      },
      {path: 'product-enter', canActivate: [PagesGuard], loadChildren: './product-enter/product-enter.module#ProductEnterModule'},
      {path: 'inventory', canActivate: [PagesGuard], loadChildren: './inventory/inventory.module#InventoryModule'},
      {path: 'product', canActivate: [PagesGuard], loadChildren: './product/product.module#ProductModule'},
      {path: 'report-product', canActivate: [PagesGuard], loadChildren: './report-product/report-product.module#ReportProductModule'},
      {path: 'report-sale', canActivate: [PagesGuard], loadChildren: './report-sale/report-sale.module#ReportSaleModule'},
      {path: 'report-user', canActivate: [PagesGuard], loadChildren: './report-user/report-user.module#ReportUserModule'},
      {path: 'user', canActivate: [PagesGuard], loadChildren: './user/user.module#UserModule'},
      {path: 'subsidiary', canActivate: [PagesGuard], loadChildren: './subsidiary/subsidiary.module#SubsidiaryModule'},
      {path: 'setting', canActivate: [PagesGuard], loadChildren: './setting/setting.module#SettingModule'},
      ...errorRoute
    ]
  },
];

export const routing = RouterModule.forChild(routes);
