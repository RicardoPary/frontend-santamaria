import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as layout from '../layout/shared/layout.action';
import {MatRadioChange, MatSelectChange} from '@angular/material';
import {componentDestroyed} from '../utils/component-destroyed';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'elastic-settings',
  template: `
    <div class="settings">
      <div id="settings-layouts" fxLayout="column" fxLayoutAlign="start start">
        <div class="title no-margin-top">Layouts:</div>

        <mat-radio-group class="layout-radio-group" (change)="setLayout($event)" fxLayout="column" fxLayoutGap="24px">
          <mat-radio-button value="alpha">
            <img class="layout-option-image" src="assets/img/demo/settings/layout_alpha.png">
          </mat-radio-button>
          <mat-radio-button value="beta">
            <img class="layout-option-image" src="assets/img/demo/settings/layout_beta.png">
          </mat-radio-button>
          <mat-radio-button value="gamma">
            <img class="layout-option-image" src="assets/img/demo/settings/layout_gamma.png">
          </mat-radio-button>
        </mat-radio-group>
      </div>

      <div class="title">Card Elevation:</div>

      <mat-form-field>
        <mat-select [(ngModel)]="cardElevationClass" (change)="setCardElevation($event)">
          <mat-option value="card-elevation-z0">Flat</mat-option>
          <mat-option *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]" [value]="'card-elevation-z' + i">
            Elevation z{{i}}
          </mat-option>
        </mat-select>
      </mat-form-field>

    </div>

  `,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  cardElevationClass: string;

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.store.select(fromRoot.getCardElevation).pipe(
      takeUntil(componentDestroyed(this))
    ).subscribe((elevation) => {
      this.cardElevationClass = elevation;
    });
  }

  setLayout(radioEvent: MatRadioChange) {
    this.store.dispatch(new layout.SelectLayoutAction(radioEvent.value));
  }

  setCardElevation(selectEvent: MatSelectChange) {
    this.store.dispatch(new layout.SetCardElevationAction(selectEvent.value));
  }

  ngOnDestroy() {
  }
}
