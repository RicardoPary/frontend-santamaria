import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar-routes.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private listTitles: any[];
  location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  onClose() {
    $('#main-content').removeClass('message-content');
  }

}
