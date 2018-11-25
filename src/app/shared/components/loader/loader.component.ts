import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';

import {LoaderState} from './loader.state';
import {LoaderService} from './loader.service';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-loader',
  template: '<div></div>'
})
export class LoaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    $('body').append(`
      <div id="loader-box" style="display: none">
        <div id="loader">
          <div id="shadow"></div>
          <div id="box"></div>
        </div>
        <div id="label">
          <strong id="message-loader">Loader Message</strong>
        </div>
      </div>
    `);

    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      if (state.show) {
        $('#loader-box').css('display', 'inline-block');
        $('#message-loader').html(state.message);
      } else {
        $('#loader-box').css('display', 'none');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
