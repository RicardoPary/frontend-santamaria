import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';

import { LoaderBarState } from './loader-bar.state';

@Injectable()
export class LoaderBarService {

  private loaderSubject = new Subject<LoaderBarState>();

  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<LoaderBarState>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<LoaderBarState>{ show: false });
  }
}
