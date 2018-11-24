import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ICON_SORT, ICON_SORT_ASC, ICON_SORT_DESC } from '../constant/icon-classes.constant';

@Directive({
  selector: '[vulSort]'
})
export class VulSortDirective {

  @Input() orderBy: string;
  @Input() orderType: string;

  sortAscIcon = ICON_SORT_ASC;
  sortDescIcon = ICON_SORT_DESC;
  sortIcon = ICON_SORT;
  sortIconSelector = 'i';
  element: any;

  @Output() orderByChange: EventEmitter<any> = new EventEmitter();
  @Output() orderTypeChange: EventEmitter<any> = new EventEmitter();
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor(public el: ElementRef,
              public renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  sort(field: any) {
    this.resetClasses();
    if (field !== this.orderBy) {
      this.orderType = 'asc';
    } else {
      this.orderType = (this.orderType === 'asc') ? 'desc' : 'asc';
    }
    this.orderBy = field;
    this.orderByChange.emit(field);
    this.orderTypeChange.emit(this.orderType);
    this.callback.emit();
  }

  private resetClasses() {
    const allThIcons = this.element.querySelectorAll(this.sortIconSelector);
    allThIcons.forEach((value) => {
      value.classList.remove(this.sortAscIcon);
      value.classList.remove(this.sortDescIcon);
      value.classList.add(this.sortIcon);
    });
  };
}
