import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {User} from './user.model';

@Injectable()
export class UserService {
  private resourceUrl = 'api/users';

  constructor(private http: HttpClient) {
  }

  create(user: User): Observable<HttpResponse<any>> {
    return this.http.post(this.resourceUrl, user, {observe: 'response'});
  }

  createUserCompany(user?: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.resourceUrl}/company`, user, {observe: 'response'});
  }

  updateUserCompany(user?: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.resourceUrl}/company`, user, {observe: 'response'});
  }

  updateUserPasswordCompany(user?: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.resourceUrl}/company/change_password`, user, {observe: 'response'});
  }

  changeStateUserCompany(user): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.resourceUrl}/company/change-state`, user, {observe: 'response'});
  }

  update(user: User): Observable<HttpResponse<any>> {
    return this.http.put(this.resourceUrl, user, {observe: 'response'});
  }

  find(login: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.resourceUrl}/${login}`, {observe: 'response'});
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${login}`, {observe: 'response'});
  }

  authorities(): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>('api/users/authorities', {observe: 'response'});
  }
}
