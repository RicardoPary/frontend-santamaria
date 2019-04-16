import {Component, OnDestroy, OnInit} from '@angular/core';
import {SidenavItem} from '../sidenav/sidenav-item/sidenav-item.model';
import * as fromRoot from '../../reducers/index';
import * as fromSidenav from '../sidenav/shared/sidenav.action';
import {SetCurrentlyOpenByRouteAction} from '../sidenav/shared/sidenav.action';
import {Store} from '@ngrx/store';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {SelectLayoutAction, SetCardElevationAction} from '../layout/shared/layout.action';
import {Subscription} from 'rxjs';
import {LoaderBarService} from '../../shared/modules/loader-bar/loader-bar.service';

@Component({
  selector: 'elastic-route-handler',
  template: `
    <app-loader-bar></app-loader-bar>
    <router-outlet></router-outlet>
  `
})
export class RouteHandlerComponent implements OnInit, OnDestroy {

  private subscriptionRouter: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private loaderBar: LoaderBarService) {


    this.subscriptionRouter = this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.loaderBar.show();
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.loaderBar.hide();
        }
      },
      () => {
        this.loaderBar.hide();
      }
    );


  }

  ngOnDestroy() {
    this.subscriptionRouter.unsubscribe();
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

    // Top Level Item (The item to click on so the dropdown opens)
    const dashboard = new SidenavItem({
      name: 'Dashboard',
      route: '/',
      icon: 'dashboard',
      subItems: [],
      position: 1,
      routerLinkActiveOptions: {
        exact: true
      }
    });

    const patient = new SidenavItem({
      name: 'Pacientes',
      icon: 'group',
      subItems: [],
      position: 1
    });

    const patientSubItems = [
      new SidenavItem({
        name: 'Lista de Pacientes',
        route: '/patient-list',
        parent: patient,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Historia Clinica',
        route: '/medical-history',
        parent: patient,
        subItems: [],
        position: 2
      }),
      new SidenavItem({
        name: 'Lista de Atenciones',
        route: '/attentions-list',
        parent: patient,
        subItems: [],
        position: 3
      }),
      new SidenavItem({
        name: 'Detalle de Insumos',
        route: '/input-details',
        parent: patient,
        subItems: [],
        position: 4
      })
    ];

    patient.subItems.push(...patientSubItems);

    const inventory = new SidenavItem({
      name: 'Inventario',
      icon: 'grade',
      subItems: [],
      position: 1
    });

    const inventorySubItems = [
      new SidenavItem({
        name: 'Lista de Inventarios',
        route: '/list-inventories',
        parent: inventory,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Lista de Insumos',
        route: '/input-list',
        parent: inventory,
        subItems: [],
        position: 2
      })
    ];

    inventory.subItems.push(...inventorySubItems);

    const staff = new SidenavItem({
      name: 'Personal',
      icon: 'grade',
      subItems: [],
      position: 1
    });

    const staffSubItems = [
      new SidenavItem({
        name: 'Lista del Personal',
        route: '/staff-list',
        parent: staff,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Lista de Contrato',
        route: '/contract-list',
        parent: staff,
        subItems: [],
        position: 2
      })
    ];

    staff.subItems.push(...staffSubItems);

    const user = new SidenavItem({
      name: 'Usuarios',
      icon: 'person',
      subItems: [],
      position: 1
    });

    const userSubItems = [
      new SidenavItem({
        name: 'Lista Usuarios',
        route: '/user-list',
        parent: user,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Lista de Roles',
        route: '/role-list',
        parent: user,
        subItems: [],
        position: 1
      }),
      new SidenavItem({
        name: 'Asignar Rol',
        route: '/assign-role',
        parent: user,
        subItems: [],
        position: 1
      })
    ];

    user.subItems.push(...userSubItems);

    this.store.dispatch(new fromSidenav.AddSidenavItemAction(dashboard));

    this.store.dispatch(new fromSidenav.AddSidenavItemAction(patient));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(inventory));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(staff));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(user));
  }
}
