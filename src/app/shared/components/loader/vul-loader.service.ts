import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';

import {LoaderState} from './vul-loader.state';

@Injectable()
export class VulLoaderService {

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
