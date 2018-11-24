import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get('api/account');
  }

  activate(key: string): Observable<any> {
    let params: HttpParams = new HttpParams().set('key', key);
    return this.http.get('api/activate', { params: params });
  }

  resetPassword(keyAndPassword: any): Observable<any> {
    return this.http.post('api/account/reset-password/finish', keyAndPassword);
  }
}
