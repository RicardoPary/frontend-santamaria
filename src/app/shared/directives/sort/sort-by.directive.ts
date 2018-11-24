import { AfterViewInit, Directive, ElementRef, Host, HostListener, Input, Renderer } from '@angular/core';
import { KraSortDirective } from './sort.directive';
import { KRA_ARROW_DOWN_ICON, KRA_ARROW_UP_ICON } from './sort-icons.constant';

@Directive({
  selector: '[kraSortBy]'
})
export class KraSortByDirective implements AfterViewInit {


  @Input() kraSortBy: string;

  sortAscIcon = KRA_ARROW_UP_ICON;
  sortDescIcon = KRA_ARROW_DOWN_ICON;

  kraSort: KraSortDirective;

  constructor(@Host() jhiSort: KraSortDirective, private el: ElementRef, private renderer: Renderer) {
    this.kraSort = jhiSort;
  }

  ngAfterViewInit(): void {
    if (this.kraSort.predicate && this.kraSort.predicate !== '_score' && this.kraSort.predicate === this.kraSortBy) {
      this.applyClass();
    }
  }

  @HostListener('click') onClick() {
    if (this.kraSort.predicate && this.kraSort.predicate !== '_score') {
      this.kraSort.sort(this.kraSortBy);
      this.applyClass();
    }
  }

  private applyClass() {
    const childSpan = this.el.nativeElement.children[1];
    let add = this.sortAscIcon;
    if (!this.kraSort.ascending) {
      add = this.sortDescIcon;
    }
    this.renderer.setElementClass(childSpan, add, true);
  }
}
