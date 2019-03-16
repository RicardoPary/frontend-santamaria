import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';

import {LoaderState} from './loader.state';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show(message?: string) {
    if (!message) message = 'Procesando...';
    this.loaderSubject.next(<LoaderState>{show: true, message: message});
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{show: false});
  }
}
