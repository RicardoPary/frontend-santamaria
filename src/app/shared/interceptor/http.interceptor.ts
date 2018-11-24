import { Injectable, Injector } from '@angular/core';
import { ConnectionBackend, Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import 'rxjs/index';
import 'rxjs/index';

import { LoginService } from '../services/login.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class InterceptedHttp extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
              private injector: Injector,
              private localStorage: LocalStorageService,
              private sessionStorage: SessionStorageService) {
    super(backend, defaultOptions);
  }

  /*get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return this.intercept(
      super.get(this.getFullUrl(url), this.requestOptions(options))
        .catch(this.onCatch)
        .do((res: Response) => {
          this.onSubscribeSuccess(res);
        }, (error: any) => {
          this.onSubscribeError(error);
        })
        .finally(() => {
          this.onFinally();
        })
    );
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return this.intercept(
      super.post(this.getFullUrl(url), body, this.requestOptions(options))
        .catch(this.onCatch)
        .do((res: Response) => {
          this.onSubscribeSuccess(res);
        }, (error: any) => {
          this.onSubscribeError(error);
        })
        .finally(() => {
          this.onFinally();
        }));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return this.intercept(
      super.put(this.getFullUrl(url), body, this.requestOptions(options))
        .catch(this.onCatch)
        .do((res: Response) => {
          this.onSubscribeSuccess(res);
        }, (error: any) => {
          this.onSubscribeError(error);
        })
        .finally(() => {
          this.onFinally();
        })
    );
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return this.intercept(
      super.patch(this.getFullUrl(url), body, this.requestOptions(options))
        .catch(this.onCatch)
        .do((res: Response) => {
          this.onSubscribeSuccess(res);
        }, (error: any) => {
          this.onSubscribeError(error);
        })
        .finally(() => {
          this.onFinally();
        })
    );
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(
      super.delete(this.getFullUrl(url), this.requestOptions(options))
        .catch(this.onCatch)
        .do((res: Response) => {
          this.onSubscribeSuccess(res);
        }, (error: any) => {
          this.onSubscribeError(error);
        })
        .finally(() => {
          this.onFinally();
        })
    );
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    let token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    if (!!token) {
      options.headers.append('Authorization', 'Bearer ' + token);
    }
    return options;
  }

  private intercept(observable: Observable<Response>): Observable<Response> {
    return <Observable<Response>> observable.catch((error, source) => {
      if (error.status === 401) {
        console.info('response intercept navigated to login');
        const loginService: LoginService = this.injector.get(LoginService);
        loginService.logout();
        const router: Router = this.injector.get(Router);
        router.navigate(['login']);
      }
      return Observable.throw(error);
    });
  }*/

  private getFullUrl(url: string): string {
    // return full URL to API here
    return environment.endPoint + url;
  }

  /**
   * Request interceptor.
   */
  private requestInterceptor(): void {
    // console.info('show loader box');
    // $('#loader-box').css('display', 'inline-block');
  }

  /**
   * Response interceptor.
   */
  private responseInterceptor(): void {
    // console.info('hide loader box');
    // $('#loader-box').css('display', 'none');
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  /**
   * onSubscribeSuccess
   * @param res
   */
  private onSubscribeSuccess(res: Response): void {
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.responseInterceptor();
  }

}
