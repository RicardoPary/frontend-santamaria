import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class CashService {

  private urlResource = 'api/cash';

  constructor(private http: HttpClient) {
  }

  getCash(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  postCash(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteCash(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  editCash(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
