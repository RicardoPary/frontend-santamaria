import { Component, Input } from '@angular/core';

/**
 * A component that will take care of item count statistics of a pagination.
 */
@Component({
  selector: 'kra-item-count',
  template: `
    <div>
      Mostrando {{((page - 1) * itemsPerPage) == 0 ? 1 : ((page - 1) * itemsPerPage + 1)}} -
      {{(page * itemsPerPage) < total ? (page * itemsPerPage) : total}} de <b>{{total}}</b> Registros.
    </div>`
})
export class KraItemCountComponent {

  /**
   *  current page number.
   */
  @Input() page: number;

  /**
   *  Total number of items.
   */
  @Input() total: number;

  /**
   *  Number of items per page.
   */
  @Input() itemsPerPage: number;

  constructor() {
  }

}
