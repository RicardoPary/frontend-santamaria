import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { LoaderBarService } from './layout/loader-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private sub;

  constructor(private loaderBar: LoaderBarService, private router: Router) {

    this.sub = this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.loaderBar.show();
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.loaderBar.hide();
        }
      },
      () => {
        this.loaderBar.hide();
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
