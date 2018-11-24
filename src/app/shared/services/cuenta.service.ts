import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class CuentaService {

  private urlResource = 'api/account';

  constructor(protected http: HttpClient) {
  }

  getCuenta(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }
}
