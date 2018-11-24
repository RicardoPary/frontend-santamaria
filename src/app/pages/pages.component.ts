import {Component} from '@angular/core';

@Component({
  selector: 'pages',
  template: `
    <div class="side-bar">
      <app-sidebar></app-sidebar>
    </div>
    <div id="main-content" class="main-content">
      <router-outlet></router-outlet>
      <router-outlet name="popup"></router-outlet>
    </div>
  `
})
export class Pages {

  constructor() {

  }
}
