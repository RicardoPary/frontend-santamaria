import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SidenavItem} from './sidenav-item/sidenav-item.model';
import {Observable} from 'rxjs';
import * as fromRoot from '../../reducers/index';
import {Store} from '@ngrx/store';

@Component({
  selector: 'elastic-sidenav',
  template: `
    <div class="sidenav" fxLayout="column">

      <!-- Layout: Alpha -->
      <div class="header" fxLayout="row" fxLayoutAlign="start center" *ngIf="layout === 'alpha'">

        <img class="logo" alt="logo" src="assets/img/logo2x.png">
        <span fxFlex></span>

        <div class="actions" fxLayout="row" fxLayoutAlign="start center">
          <button class="toggle" type="button" mat-icon-button (click)="toggleSidenavCollapse()" *ngIf="collapsed">
            <mat-icon>radio_button_unchecked</mat-icon>
          </button>
          <button class="toggle" type="button" mat-icon-button (click)="toggleSidenavCollapse()" *ngIf="!collapsed">
            <mat-icon>radio_button_checked</mat-icon>
          </button>
        </div>
      </div>
      <!-- /Layout: Alpha -->

      <elastic-scrollbar class="menu" fxFlex>

        <div class="heading" fxLayout="row" fxLayoutAlign="space-between center">
          <div class="name">Navigation</div>

          <!-- Layout: Beta -->
          <div class="actions" *ngIf="layout === 'beta'">
            <button class="toggle" type="button" mat-icon-button (click)="toggleSidenavCollapse()" *ngIf="collapsed">
              <mat-icon>radio_button_unchecked</mat-icon>
            </button>
            <button class="toggle" type="button" mat-icon-button (click)="toggleSidenavCollapse()" *ngIf="!collapsed">
              <mat-icon>radio_button_checked</mat-icon>
            </button>
          </div>
          <!-- /Layout: Beta -->

        </div>

        <div class="sidenav-item-holder" *ngFor="let item of sidenavItems$ | async">
          <elastic-sidenav-item class="sidenav-item-container" [item]="item"
                                [currentlyOpen]="currentlyOpen$ | async"></elastic-sidenav-item>
        </div>

      </elastic-scrollbar>

    </div>
  `
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Input('layout') layout: string; // Layout
  @Input('collapsed') collapsed: boolean;
  @Output('toggledSidenavCollapse') toggledSidenavCollapse = new EventEmitter();

  sidenavItems$: Observable<SidenavItem[]>;
  currentlyOpen$: Observable<SidenavItem[]>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.sidenavItems$ = this.store.select(fromRoot.getSidenavItems);
    this.currentlyOpen$ = this.store.select(fromRoot.getSidenavCurrentlyOpen);
  }

  toggleSidenavCollapse() {
    this.toggledSidenavCollapse.emit();
  }

  ngOnDestroy() {
  }
}
