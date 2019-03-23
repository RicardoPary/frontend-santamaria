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

    const dashboard = new SidenavItem({
      name: 'Dashboard',
      route: '/',
      icon: 'dashboard',
      subItems: [],
      position: 1
    });

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
        route: '/patient',
        parent: patient,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Agregar Nuevo Paciente',
        route: '/patient',
        parent: patient,
        subItems: [],
        position: 1
      })
    ];

    patient.subItems.push(...patientSubItems);


    const clinicHistory = new SidenavItem({
      name: 'Historia Clinica',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });


    const clinicHistorySubItems1 = [
      new SidenavItem({
        name: 'Lista de Pacientes',
        route: '/medical-history',
        parent: clinicHistory,
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
        parent: inventory,
        subItems: [],
        position: 1
      })
    ];

    inventory.subItems.push(...inventorySubItems);

    const staff = new SidenavItem({
      name: 'Personal',
      icon: 'grade',
      route: '/staff',
      subItems: [],
      position: 1
    });

    const staffSubItems = [
      new SidenavItem({
        name: 'Personal Administrativo',
        route: '/staff',
        parent: staff,
        subItems: [],
        position: 1
      })
    ];

    staff.subItems.push(...staffSubItems);

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
        route: '/user',
        parent: user,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Lista de Roles',
        route: '/forms/form-elements',
        parent: user,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Asignar Rol',
        route: '/forms/form-elements',
        parent: user,
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
        parent: input,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Lista de Insumos',
        route: '/forms/form-elements',
        parent: input,
        subItems: [],
        position: 1
      })
    ];

    input.subItems.push(...inputSubItems);

    const medicineAsigned = new SidenavItem({
      name: 'Medicamentos',
      icon: 'grade',
      route: '/material-icons',
      subItems: [],
      position: 1
    });

    const medicineAsignedSubItems = [
      new SidenavItem({
        name: 'Medicamentos Asignados',
        route: '/forms/form-elements',
        parent: medicineAsigned,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Crear Consulta',
        route: '/forms/form-elements',
        parent: medicineAsigned,
        subItems: [],
        position: 1
      })
    ];

    medicineAsigned.subItems.push(...medicineAsignedSubItems);


    this.store.dispatch(new fromSidenav.AddSidenavItemAction(dashboard));

    this.store.dispatch(new fromSidenav.AddSidenavItemAction(patient));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(clinicHistory));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(inventory));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(staff));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(input));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(medicineAsigned));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(user));

  }

}
