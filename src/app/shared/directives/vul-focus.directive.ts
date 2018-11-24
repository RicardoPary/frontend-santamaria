import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector : '[vulFocus]'
})
export class VulFocusDirective implements OnInit {
  constructor(public elementRef: ElementRef) {}
  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }
}
