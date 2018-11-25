import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';

import { LoaderState } from './vul-loader.state';
import { VulLoaderService } from './vul-loader.service';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'vul-loader',
  template: '<div></div>'
})
export class VulLoaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private loaderService: VulLoaderService) {
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
