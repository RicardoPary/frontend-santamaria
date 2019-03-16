import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class RoleService {

  private urlResource = 'api/roles';

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<HttpResponse<any>> {
    return this.http.get(this.urlResource, {observe: 'response'});
  }
}
