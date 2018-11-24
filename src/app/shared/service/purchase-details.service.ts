import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class PurchaseDetailsService {

  private urlResource = 'api/purchase-details';

  constructor(private http: HttpClient) {
  }

  getPurchaseDetails(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  postPurchaseDetails(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deletePurchaseDetails(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  editPurchaseDetails(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
