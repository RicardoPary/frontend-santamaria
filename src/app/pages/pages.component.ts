import { Component, OnInit } from '@angular/core';

@Component({
    template: `
      <app-header></app-header>
      <app-sidebar></app-sidebar>
      <section class="main-container">
        <router-outlet></router-outlet>
      </section>

    `,
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
