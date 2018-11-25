import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../../shared/models/extras/request-util';
import {UserFilter} from '../../shared/models/user';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class UserService {

  private urlResource = 'api/cns/usuario';
  private userFilter = new BehaviorSubject<any>(new UserFilter());

  constructor(private http: HttpClient) {
  }

  sendUserFilter(object: any) {
    this.userFilter.next(object);
  }

  currentUserFilter(): Observable<any> {
    return this.userFilter.asObservable();
  }

  getUserFilter() {
    return this.userFilter.getValue();
  }

  getAllUsers(userFilter: UserFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'pagina': userFilter.page,
      'nroElementos': userFilter.size,
      'orden': userFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createUser(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteUser(id): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyUser(body: any, id: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}/${id}`, body, {observe: 'response'});
  }
}
