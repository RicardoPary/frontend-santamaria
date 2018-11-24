import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginService} from '../../shared/service/login.service';
import {Router} from '@angular/router';
import {Principal} from '../../shared/auth/principal.service';
import {UserBindService} from '../../shared/service/userBind.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {AccountService} from '../../shared/auth/account.service';
import {Sidebar, SubMenu} from './sidebar';
import {BranchService} from '../../shared/service/branch.service';
import {KrakenService} from '../../shared/service/kraken.service';
import {Subscription} from 'rxjs/index';
import {ReportService} from '../../shared/service/report.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: any;
  applicationVersion: any;
  menus: Sidebar[] = new Array();
  branchFilter = '';
  branchs: any = [];
  buttonEmitirFacturas: boolean;
  subscriptionkrakenService: Subscription = new Subscription();

  constructor(private loginService: LoginService,
              private router: Router,
              private principal: Principal,
              private $sessionStorage: SessionStorageService,
              private userbindService: UserBindService,
              private accountService: AccountService,
              private branchService: BranchService,
              private $localStorage: LocalStorageService,
              private krakenService: KrakenService,
              private reportService: ReportService) {

    this.krakenService.getAllBranches().subscribe(
      res => {
        if (res) {
          this.branchs = res.body;
          this.branchs.length > 0 ? this.changeIdBranch(this.branchs[0].id) : '';
        }
      }
    );

  }

  ngOnInit() {
    this.converterMenu(
      [
        {
          'id': 1,
          'name': 'Dashboard',
          'icon': 'icon-bar-chart-2',
          'sequence': 1,
          'url': '/pages/dashboard',
          'module': null
        },
        {
          'id': 2,
          'name': 'Categorías',
          'icon': 'icon-file-text',
          'sequence': 2,
          'url': '/pages/category',
          'module': null
        },
        {
          'id': 3,
          'name': 'Agregar Inventario',
          'icon': 'icon-file-plus',
          'sequence': 1,
          'url': '/pages/inventory',
          'module': {'id': 1, 'name': 'Inventarios', 'icon': 'mdi mdi-clipboard-check-outline', 'sequence': 3}
        },
        {
          'id': 3,
          'name': 'Producto',
          'icon': 'icon-file-text',
          'sequence': 1,
          'url': '/pages/product',
          'module': {'id': 1, 'name': 'Inventarios', 'icon': 'mdi mdi-clipboard-check-outline', 'sequence': 3}
        },
        {
          'id': 10,
          'name': 'Venta por producto',
          'icon': 'mdi mdi-food',
          'sequence': 3,
          'url': '/pages/report-product',
          'module': {'id': 5, 'name': 'Reportes', 'icon': 'icon-percent', 'sequence': 4}
        },
        {
          'id': 11,
          'name': 'Venta por usuario',
          'icon': 'mdi mdi-account-check',
          'sequence': 3,
          'url': '/pages/report-sale',
          'module': {'id': 5, 'name': 'Reportes', 'icon': 'icon-percent', 'sequence': 4}
        },
        {
          'id': 12,
          'name': 'Venta de producto',
          'icon': 'mdi mdi-chart-histogram',
          'sequence': 3,
          'url': '/pages/report-user',
          'module': {'id': 5, 'name': 'Reportes', 'icon': 'icon-percent', 'sequence': 4}
        },
        {
          'id': 11,
          'name': 'Usuarios',
          'icon': 'icon-users',
          'sequence': 1,
          'url': '/pages/user',
          'module': {'id': 4, 'name': 'Configuración', 'icon': 'mdi mdi-settings', 'sequence': 6}
        },
        {
          'id': 12,
          'name': 'Sucursales',
          'icon': 'mdi mdi-sitemap',
          'sequence': 2,
          'url': '/pages/subsidiary',
          'module': {'id': 4, 'name': 'Configuración', 'icon': 'mdi mdi-settings', 'sequence': 6}
        },
        {
          'id': 15,
          'name': 'Emitir facturas',
          'icon': '',
          'sequence': null,
          'url': '/invoice',
          'module': null
        }], this.menus);

    this.getAccount();
  }

  changeIdBranch(id) {
    this.branchFilter = id;
    this.branchService.sendIdBranch(id);
    this.$localStorage.store('branchId', id);
  }

  ngOnDestroy() {
    this.accountService.sentMenuUser(null);
    this.subscriptionkrakenService.unsubscribe();
    this.reportService.sentInvoicesPerHour(null);
    this.reportService.sentOrdersPerMonth(null);
    this.reportService.sentOrdersPerMonthAndYear(null);
  }

  orderObject(object: any) {
    let aux: any;
    for (let i = 0; i < object.length - 1; i++) {
      for (let j = i + 1; j < object.length; j++) {
        if (object[i].sequence > object[j].sequence) {
          aux = object[i];
          object[i] = object[j];
          object[j] = aux;
        }
      }
    }
  }

  converterMenu(menuAux, menu) {
    menuAux.map(
      item => {
        if (item.id === 15) {
          this.buttonEmitirFacturas = true;
        } else {
          if (item.module !== null) {
            const obj1 = new Sidebar(item.module.id, item.module.name, item.module.icon, item.module.sequence, item.module.url,
              true, new Array());
            (!obj1.verifyObject(menu)) ? menu.push(obj1) : '';
          } else {
            const obj2 = new Sidebar(item.id, item.name, item.icon, item.sequence, item.url, null, null);
            menu.push(obj2);
          }
        }

      }
    );
    this.orderObject(menu);
    this.converterSubMenu(menuAux, menu);
    menu.map(item => item.subMenu !== null ? this.orderObject(item.subMenu) : '');
  }

  converterSubMenu(menuAux: any, menu) {
    menuAux.map(
      item => {
        if (item.module !== null) {
          const obj = new SubMenu(item.id, item.name, item.icon, item.sequence, item.url);
          menu.map(item2 => (item2.id === item.module.id && item2.name === item.module.name) ? item2.subMenu.push(obj) : '');
        }
      }
    );
  }

  getAccount() {
    this.accountService.get().toPromise().then((account) => {
      if (account) {
        this.user = account.body;
      }
    }).catch((err) => {
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  clearInvoice() {
    this.$sessionStorage.clear('customerInvoice');
  }
}
