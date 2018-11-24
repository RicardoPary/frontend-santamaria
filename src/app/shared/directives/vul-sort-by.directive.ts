import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { VulSortDirective } from './vul-sort.directive';
import { ICON_SORT_ASC, ICON_SORT_DESC } from '../constant/icon-classes.constant';

@Directive({
  selector: '[vulSortBy]'
})
export class VulSortByDirective {

  @Input() vulSortBy: string;
  vulSort: VulSortDirective;
  sortAscIcon = ICON_SORT_ASC;
  sortDescIcon = ICON_SORT_DESC;

  constructor(@Host() vulSort: VulSortDirective,
              private el: ElementRef,
              private renderer: Renderer2) {
    this.vulSort = vulSort;
  }

  @HostListener('click') onClick() {
    if (this.vulSort.orderBy && this.vulSort.orderBy !== '') {
      this.vulSort.sort(this.vulSortBy);
      this.applyClass();
    }
  }

  private applyClass() {
    const childSpan = this.el.nativeElement.children[0];
    let add = this.sortAscIcon;
    if (this.vulSort.orderType !== 'asc') {
      add = this.sortDescIcon;
    }
    this.renderer.addClass(childSpan, add);
  };
}
