import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class UserIntegrationService {

  private resourceUrl = 'api/user-integrations';

  constructor(private http: HttpClient) {
  }

  create(user): Observable<HttpResponse<any>> {
    return this.http.post(this.resourceUrl, user, {observe: 'response'});
  }

  update(user): Observable<HttpResponse<any>> {
    return this.http.put(this.resourceUrl, user, {observe: 'response'});
  }
}
