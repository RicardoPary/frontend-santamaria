import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {DocenteFilter} from '../models/docente';
import {createRequestOption} from '../models/extras/request-util';
import {ReunionFilter} from '../models/reunion';

@Injectable()
export class ReunionService {
  private urlResource = 'api/reunions';
  private reunionFilter = new BehaviorSubject<any>(new ReunionFilter);

  constructor(protected http: HttpClient) {
  }

  sendReunionFilter(object: any) {
    this.reunionFilter.next(object);
  }

  currentReunionFilter(): Observable<any> {
    return this.reunionFilter.asObservable();
  }

  getReunionFilter() {
    return this.reunionFilter.getValue();
  }

  getAllReuniones(reunionFilter: ReunionFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': reunionFilter.page,
      'size': reunionFilter.size,
      'sort': reunionFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createReunion(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteReunion(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyReunion(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
