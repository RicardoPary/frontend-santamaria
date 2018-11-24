import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Injector } from '@angular/core';

import { InterceptedHttp } from './http.interceptor';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
                            injector: Injector,
                            localStorage: LocalStorageService,
                            sessionStorage: SessionStorageService): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, injector, localStorage, sessionStorage);
}

export function httpFactoryProvider() {
  return {
    provide: Http,
    useFactory: httpFactory,
    deps: [
      XHRBackend,
      RequestOptions,
      Injector,
      LocalStorageService,
      SessionStorageService
    ]
  };
}

