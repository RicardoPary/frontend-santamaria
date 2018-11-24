import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Subject} from 'rxjs/index';

@Injectable()
export class AccountService {
  private resourceUrl = 'api/account';
  private versionIdentity: any;
  private authenticated = false;
  private versionState = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  sentMenuUser(obj: any) {
    this.versionState.next(obj);
    this.versionIdentity = null;
  }

  getMenuUser(idRole: number, force?: boolean): Promise<HttpResponse<any>> {
    if (force === true) {
      this.versionIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.versionIdentity) {
      return Promise.resolve(this.versionIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.http.get('api/roles/' + idRole, {observe: 'response'}).toPromise().then((version) => {
      if (version) {
        this.versionIdentity = version;
        this.authenticated = true;
      } else {
        this.versionIdentity = null;
        this.authenticated = false;
      }
      this.versionState.next(this.versionIdentity);
      return this.versionIdentity;

    }).catch(() => {
      this.versionIdentity = null;
      this.authenticated = false;
      this.versionState.next(this.versionIdentity);
      return null;
    });
  }

  get(): Observable<HttpResponse<any>> {
    return this.http.get(this.resourceUrl, {observe: 'response'});
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(this.resourceUrl, account, {observe: 'response'});
  }

  changePassword(newPassword: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.resourceUrl}/change-password`, newPassword, {observe: 'response'});
  }

  getMenus(idRole: number): Observable<HttpResponse<any>> {
    return this.http.get('api/roles/' + idRole, {observe: 'response'});
  }
}
