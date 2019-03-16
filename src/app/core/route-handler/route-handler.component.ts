import {Component, OnInit} from '@angular/core';
import {SidenavItem} from '../sidenav/sidenav-item/sidenav-item.model';
import * as fromRoot from '../../reducers/index';
import * as fromSidenav from '../sidenav/shared/sidenav.action';
import {SetCurrentlyOpenByRouteAction} from '../sidenav/shared/sidenav.action';
import {Store} from '@ngrx/store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SelectLayoutAction, SetCardElevationAction} from '../layout/shared/layout.action';

@Component({
  selector: 'elastic-route-handler',
  template: `
    <router-outlet></router-outlet>
  `
})
export class RouteHandlerComponent implements OnInit {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // Set Sidenav Currently Open on Page load
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.store.dispatch(new SetCurrentlyOpenByRouteAction(event.urlAfterRedirects));
      }
    });

    // You can use ?layout=beta to load the page with Layout Beta as default
    // Same with ?elevation=5 (anything from 0 to 24)
    this.route.queryParamMap.subscribe((params) => {
      const layout = params.get('layout');

      switch (layout) {
        case 'alpha': {
          this.store.dispatch(new SelectLayoutAction('alpha'));
          break;
        }

        case 'beta': {
          this.store.dispatch(new SelectLayoutAction('beta'));
          break;
        }

        case 'gamma': {
          this.store.dispatch(new SelectLayoutAction('gamma'));
          break;
        }
      }

      const elevation = params.get('elevation');

      if (elevation) {
        this.store.dispatch(new SetCardElevationAction('card-elevation-z' + elevation));
      }
    });

    // Define Menu Items here

    // Top Level Item (The item to click on so the dropdown opens)
    const dashboard = new SidenavItem({
      name: 'Dashboard',
      icon: 'dashboard',
      subItems: [],
      position: 1
    });

    // Sub Items for the Top Level Item (The items shown when you clicked on the dropdown item)
    // Note: The Top Level Item is added as "parent" in those items, here "dashboard" (variable from above)
    const dashboardSubItems = [
      new SidenavItem({
        name: 'Dashboard',
        route: '/',
        parent: dashboard,
        subItems: [],
        position: 1,
        routerLinkActiveOptions: {
          exact: true
        }
      }),
      new SidenavItem({
        name: 'All-In-One Board',
        route: '/dashboard/all-in-one',
        parent: dashboard,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'CRM Dashboard',
        route: '/dashboard/crm',
        parent: dashboard,
        subItems: [],
        position: 1
      }),
    ];

    // Push the just created Sub Items into the Top Level Item
    dashboard.subItems.push(...dashboardSubItems);

    const forms = new SidenavItem({
      name: 'Forms',
      icon: 'assignment',
      route: null,
      subItems: [],
      position: 1
    });

    const formsSubItems = [
      new SidenavItem({
        name: 'Form Elements',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      }),

      new SidenavItem({
        name: 'Form Wizard',
        route: '/forms/form-wizard',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    forms.subItems.push(...formsSubItems);

    const clinicHistory = new SidenavItem({
      name: 'Historia Clinica',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });


    const clinicHistorySubItems1 = [
      new SidenavItem({
        name: 'Lista de Historial',
        route: '/medical-history',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    clinicHistory.subItems.push(...clinicHistorySubItems1);


    const inventory = new SidenavItem({
      name: 'Inventario',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const inventorySubItems = [
      new SidenavItem({
        name: 'Lista de Inventarios',
        route: '/inventory',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    inventory.subItems.push(...inventorySubItems);

    const material = new SidenavItem({
      name: 'Material',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const materialSubItems = [
      new SidenavItem({
        name: 'Lista de Material',
        route: '/supply',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    material.subItems.push(...materialSubItems);

    const patient = new SidenavItem({
      name: 'Pacientes',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const patientSubItems = [
      new SidenavItem({
        name: 'Lista de Pacientes',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    patient.subItems.push(...patientSubItems);

    const staff = new SidenavItem({
      name: 'Personal',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const staffSubItems = [
      new SidenavItem({
        name: 'Personal Administrativo',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    staff.subItems.push(...staffSubItems);

    const report = new SidenavItem({
      name: 'Reportes',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const reportSubItems = [
      new SidenavItem({
        name: 'Lista Reportes',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    report.subItems.push(...reportSubItems);

    const role = new SidenavItem({
      name: 'Roles',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const roleSubItems = [
      new SidenavItem({
        name: 'Lista de Roles',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Asignar Rol',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    role.subItems.push(...roleSubItems);

    const user = new SidenavItem({
      name: 'Usuarios',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const userSubItems = [
      new SidenavItem({
        name: 'Lista Usuarios',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    user.subItems.push(...userSubItems);

    const input = new SidenavItem({
      name: 'Insumos',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const inputSubItems = [
      new SidenavItem({
        name: 'Categorias',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Lista de Insumos',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    input.subItems.push(...inputSubItems);

    const medicineAsigned = new SidenavItem({
      name: 'Medicamentos Asignados',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const medicineAsignedSubItems = [
      new SidenavItem({
        name: 'Medicamentos Asignados',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Crear Consulta',
        route: '/forms/form-elements',
        parent: forms,
        subItems: [],
        position: 1
      })
    ];

    medicineAsigned.subItems.push(...medicineAsignedSubItems);

    // Send the created Menu structure to Redux/ngrx (you only need to send the Top Level Item, all dropdown items will be added automatically)
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(dashboard));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(forms));

    this.store.dispatch(new fromSidenav.AddSidenavItemAction(clinicHistory));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(inventory));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(material));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(patient));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(staff));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(report));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(role));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(user));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(input));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(medicineAsigned));

  }

}
