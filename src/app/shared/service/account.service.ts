import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable()
export class AccountService {

  private urlResource = 'api/account';

  private idBranch = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  getAccount(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }
}
