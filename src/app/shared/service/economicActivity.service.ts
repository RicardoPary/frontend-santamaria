import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class EconomicActivityService {

  private urlResource = 'api/economic-activities';

  constructor(private http: HttpClient) {
  }

  getEconomicActivity(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  createEconomicActivity(body?: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  updateEconomicActivity(body?: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteEconomicActivity(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  lockEconomicActivity(id: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}/lock/${id}`, {}, {observe: 'response'});
  }

  unlockEconomicActivity(id: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}/unlock/${id}`, {}, {observe: 'response'});
  }
}
