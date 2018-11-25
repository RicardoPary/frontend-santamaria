import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {BehaviorSubject} from 'rxjs/index';
import {UserFilter} from '../models/user';

@Injectable()
export class UserService {

  private urlResource = 'api/users';
  private filterUsers = new BehaviorSubject<any>(new UserFilter);

  constructor(private http: HttpClient) {
  }

  sendFilterUsers(object: any) {
    this.filterUsers.next(object);
  }

  currentFilterUsers(): Observable<any> {
    return this.filterUsers.asObservable();
  }

  getFilterUsers() {
    return this.filterUsers.getValue();
  }


  getAllUsers(userFilter: UserFilter): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}?page=${userFilter.page}&size=${userFilter.size}&sort=${userFilter.sort}`,
      {observe: 'response'});
  }

  postUser(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteUser(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  putUser(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  updateUserPasswordCompany(body: any): Observable<any> {
    return this.http.post(`${this.urlResource}/company/change_password`, body);
  }

  changeStateUserCompany(body: any): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.urlResource}/company/change-state`, body, {observe: 'response'});
  }

  createUserCompany(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}/company`, body, {observe: 'response'});
  }

  updateUserCompany(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}/company`, body, {observe: 'response'});
  }
}
