import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';

import { LoaderBarService } from './loader-bar.service';
import { LoaderBarState } from './loader-bar.state';

@Component({
  selector: 'app-loader-bar',
  templateUrl: './loader-bar.component.html',
  styleUrls: ['./loader-bar.component.scss']
})
export class LoaderBarComponent implements OnInit, OnDestroy {

  show = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderBarService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderBarState) => this.show = state.show);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
