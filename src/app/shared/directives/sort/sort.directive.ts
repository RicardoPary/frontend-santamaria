import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { KRA_ARROW_DOWN_ICON, KRA_ARROW_UP_ICON, KRA_SORT_ICON } from './sort-icons.constant';

@Directive({
  selector: '[kraSort]'
})
export class KraSortDirective {
  @Input() predicate: string;
  @Input() ascending: boolean;
  @Input() callback: Function;

  sortIcon = KRA_SORT_ICON;
  sortAscIcon = KRA_ARROW_UP_ICON;
  sortDescIcon = KRA_ARROW_DOWN_ICON;
  sortIconSelector = 'span.mdi';

  @Output() predicateChange: EventEmitter<any> = new EventEmitter();
  @Output() ascendingChange: EventEmitter<any> = new EventEmitter();

  element: any;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  sort(field: any) {
    this.resetClasses();
    if (field !== this.predicate) {
      this.ascending = true;
    } else {
      this.ascending = !this.ascending;
    }
    this.predicate = field;
    this.predicateChange.emit(field);
    this.ascendingChange.emit(this.ascending);
    this.callback();
  }

  private resetClasses() {
    const allThIcons = this.element.querySelectorAll(this.sortIconSelector);
    for (let i = 0; i < allThIcons.length; i++) {
      allThIcons[i].classList.remove(this.sortAscIcon);
      allThIcons[i].classList.remove(this.sortDescIcon);
      allThIcons[i].classList.add(this.sortIcon);
    }
  };
}
