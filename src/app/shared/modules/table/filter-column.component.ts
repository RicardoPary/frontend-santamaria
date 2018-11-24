import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-column',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss']
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
