import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-field-type',
  styleUrls: ['./filter-column.component.scss'],
  template: `
    <div *ngIf="type === 'images'" style="padding-left: 15px;">
      <img alt="Card images cap"
           style="width: 68px;"
           src="../../../../assets/themes/materia/images/images.png">
    </div>

    <div *ngIf="type === 'textBox'" style="padding-left: 15px;">
      <input type="text" style="width: 70px;">Bs.
    </div>

    <div *ngIf="type === 'actions'" style="padding-left: 15px;">
      <button type="button" style="margin-left: 5px; display: inline-block; background: #3b8dd2;"
              class="btn btn-primary btn-sm"
              (click)="clickButtonRow($event,'edit')">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button type="button" style="margin-left: 5px; display: inline-block; background: #da534f;"
              class="btn btn-danger btn-sm"
              (click)="clickButtonRow($event,'delete')">
        <i class="fa fa-trash-o" aria-hidden="true"></i>
      </button>
    </div>

    <div *ngIf="type === 'actionsView'" style="padding-left: 15px; width: 130px;">
      <button type="button" style="margin-left: 5px; display: inline-block; background: #3b8dd2;"
              class="btn btn-primary btn-sm"
              (click)="clickButtonRow($event,'edit')">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button type="button" style="margin-left: 5px; display: inline-block; background: #da534f;"
              class="btn btn-danger btn-sm"
              (click)="clickButtonRow($event,'delete')">
        <i class="fa fa-trash-o" aria-hidden="true"></i>
      </button>
      <button type="button" style="margin-left: 5px; display: inline-block;"
              class="btn btn-primary btn-sm"
              (click)="clickButtonRow($event,'view')">
        <i class="fa fa-eye" aria-hidden="true"></i>
      </button>
    </div>

    <div *ngIf="type === 'actionsField'" style="padding-left: 15px;">
      <button type="button" style="margin-left: 5px; display: inline-block; background: #3b8dd2;"
              class="btn btn-primary btn-sm"
              (click)="clickButtonRow($event,'edit')">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button type="button" style="margin-left: 5px; display: inline-block; background: #da534f;"
              class="btn btn-danger btn-sm"
              (click)="clickButtonRow($event,'delete')">
        <i class="fa fa-trash-o" aria-hidden="true"></i>
      </button>
      <button type="button" style="margin-left: 5px; display: inline-block;"
              class="btn btn-success btn-sm"
              (click)="clickButtonRow($event,'cost')">
        <i class="fa fa-money" aria-hidden="true"></i>
      </button>
    </div>

    <div *ngIf="type === 'actionsMinusView'" style="padding-left: 15px;">
      <button type="button" style="margin-left: 5px; display: inline-block; background: #3b8dd2;"
              class="btn btn-primary btn-sm"
              (click)="clickButtonRow($event,'minus')">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button type="button" style="margin-left: 5px; display: inline-block; background: #da534f;"
              class="btn btn-danger btn-sm"
              (click)="clickButtonRow($event,'edit')">
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
      </button>
    </div>

    <div *ngIf="type === 'booleanButton'" style="padding-left: 15px;">
      <span class="badge badge-success" *ngIf="value">Activo</span>
      <span class="badge badge-danger" *ngIf="!value">Inactivo</span>
    </div>

    <div *ngIf="type === 'money'" style="padding-left: 15px;">
      {{ value | number:'1.2' || '' }} Bs
    </div>

    <div *ngIf="type === 'object'" style="padding-left: 15px;">
      {{value ? item[col.name][col.index] : 'ninguno'}}
    </div>

    <div *ngIf="type === 'text'" style="padding-left: 15px;">
      {{value || 'Ninguno'}}
    </div>

    <div *ngIf="type === 'number'" style="padding-left: 15px;">
      {{value || 0}}
    </div>

    <div *ngIf="type === 'numberPorcent'" style="padding-left: 15px;">
      {{value + ' %' || '0 %'}}
    </div>

    <div *ngIf="type === 'date'" style="padding-left: 15px;">
      {{value | date:'dd/MM/yyyy'}}
    </div>

    <div *ngIf="type === 'dateTime'" style="padding-left: 15px;">
      {{value | date:'dd/MM/yyyy hh:mm:ss '}}
    </div>

    <div *ngIf="type === 'boolean'" style="padding-left: 15px;">
      {{value ? 'Si' : 'No'}}
    </div>

    <div *ngIf="type === 'objectRole'" style="padding-left: 15px;">
      <ul *ngFor="let rol of value" style="list-style: none;" class="form-control">
        <li>
          <table>
            <tr>
              <td>Menu: {{rol.menu}}</td>
              <td>Enlace: {{rol.enlace}}</td>
              <td>Obtener: {{rol.get}}</td>
              <td>Crear: {{rol.post}}</td>
              <td>Modificar: {{rol.put}}</td>
              <td>Eliminar: {{rol.delete}}</td>
              <td>Imprimir: {{rol.print}}</td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  `
})
export class FieldTypeComponent {

  @Input() type: any;
  @Input() value: any;
  @Output() clickButton = new EventEmitter<any>();

  constructor() {
  }

  clickButtonRow(event, description) {
    this.clickButton.emit({event: event, description: description});
  }
}
