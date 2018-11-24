import { Directive, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Directive({
  selector : '[vulRouterLink]'
})
export class VulRouterLinkDirective {
  @Input('vulRouterLink') link: string;
  constructor(
              private router: Router,
              private location: Location,
              ) {}
  @HostListener('click') onClick() {
   const selection = window.getSelection();
   if (!selection.toString()) {
     this.router.navigate([`${this.location.path()}/${this.link}`]);
   }
  }
}
