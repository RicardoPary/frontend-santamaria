import { Component } from '@angular/core';
import { MediaReplayService } from './core/utils/media-replay.service';

@Component({
  selector: 'app-root',
  template: `
    <elastic-route-handler></elastic-route-handler>
  `
})
export class AppComponent {

  //noinspection JSUnusedLocalSymbols
  constructor(
    mediaReplay: MediaReplayService // workaround for Flex-Layout to receive the initial value
  ) {
    // Nothing here.
    // You probably want to go to /core/layout/ :)
  }
}
