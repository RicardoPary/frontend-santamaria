import {NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from './interceptor';

@NgModule({
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true,
      }
    ]
  ]
})
export class SharedServicesModule {
}
