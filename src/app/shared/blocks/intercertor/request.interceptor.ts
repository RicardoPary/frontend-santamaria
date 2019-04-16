import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {catchError, map} from 'rxjs/internal/operators';
import {LoginService} from '../../../core-auth';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private localStorage: LocalStorageService;
  private sessionStorage: SessionStorageService;

  constructor(private injector: Injector) {
    this.localStorage = injector.get(LocalStorageService);
    this.sessionStorage = injector.get(SessionStorageService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const fullUrl = environment.endPoint + req.url;
    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    if (token) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
        url: fullUrl
      });
    } else {
      const loginService: LoginService = this.injector.get(LoginService);
      loginService.logout();
      const router: Router = this.injector.get(Router);
      router.navigate(['login']);
      req = req.clone({
        url: fullUrl
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            const loginService: LoginService = this.injector.get(LoginService);
            loginService.logout();
            const router: Router = this.injector.get(Router);
            router.navigate(['login']).then(() => {
            });
          }
          return throwError(err);
        }
      }));
  }
}
