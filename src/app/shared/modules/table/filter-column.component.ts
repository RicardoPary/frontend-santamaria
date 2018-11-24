import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-column',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(filterColumn)" #filterColumn="ngForm" autocomplete="off">
        <div class="fitlerBox">
          <div class="filter-header">
            <h5 class="pull-left" style="float: left;">FILTRO</h5>
            <button type="button" class="close" (click)="closeFilter()" style="float: right;">
              <i class="mdi mdi-close-circle-outline" aria-hidden="true" style="color: red;"></i>
            </button>
          </div>

          <div class="filter-body" *ngIf="optionsSelect === null">
            <!--{{filterName}}-->
            <div class="form-group">
              <div class="form-group" [ngClass]="applyCssError(filter)">
                <input type="text" class="form-control"
                       [ngModel]="filterValue"
                       name="filter"
                       #filter="ngModel"
                       [pattern]="pattern">
                <div *ngIf="!filter.valid" style="color: #a94442; font-size: 12px; font-weight: normal;">
                  {{messageError}}
                </div>
              </div>
            </div>
            <button class="btn btn-block btn-primary" type="submit" [disabled]="!filterColumn.valid">Buscar</button>
          </div>

          <div class="filter-body" *ngIf="optionsSelect !== null">
            <!--{{filterName}}-->
            <div class="form-group">
              <select class="form-control"
                      [ngModel]="filterValue"
                      name="filter"
                      #filter="ngModel"
                      (keydown)="onSubmit(filterColumn)">
                <option value="" selected>Todos</option>
                <option *ngFor="let option of optionsSelect" [value]="option['id']">
                  {{option['value']}}
                </option>
              </select>
            </div>
            <button class="btn btn-block btn-primary" type="submit" [disabled]="!filterColumn.valid">Buscar</button>
          </div>

        </div>
      </form>
    </div>

  `,
  styles: []
})
export class FilterColumnComponent {

  @Input() filterValue: string;
  @Input() optionsSelect: any;
  @Input() filterName: string;
  @Input() pattern: string;
  @Input() messageError: string;
  @Output() clickCloseFilter = new EventEmitter<any>();
  @Output() clickSubmit = new EventEmitter<any>();

  constructor() {
  }

  closeFilter() {
    this.clickCloseFilter.emit();
  }

  onSubmit(form) {
    if (form.value.filter) {
      this.filterValue = form.value.filter.trim();
    } else {
      this.filterValue = '';
    }
    this.clickSubmit.emit({name: this.filterName, value: this.filterValue});
    this.closeFilter();
  }

  applyCssError(value) {
    return {
      'has-error': this.verifyValidTouched(value),
      'has-feedback': this.verifyValidTouched(value)
    };
  }

  verifyValidTouched(value) {
    return !value.valid;
  }
}
