import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../models/extras/request-util';
import {AulaFilter} from '../models/aula';

@Injectable()
export class AulaService {

  private urlResource = 'api/aulas';
  private aulaFilter = new BehaviorSubject<any>(new AulaFilter);

  constructor(protected http: HttpClient) {
  }

  sendAulaFilter(object: any) {
    this.aulaFilter.next(object);
  }

  currentAulaFilter(): Observable<any> {
    return this.aulaFilter.asObservable();
  }

  getAulaFilter() {
    return this.aulaFilter.getValue();
  }

  getAllAulas(aulaFilter: AulaFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': aulaFilter.page,
      'size': aulaFilter.size,
      'sort': aulaFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createAula(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteAula(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyAula(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
