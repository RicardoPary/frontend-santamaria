import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {DocenteFilter} from '../models/docente';
import {createRequestOption} from '../models/extras/request-util';
import {ActividadCivicaFilter} from '../models/actividad-civica';

@Injectable()
export class ActividadCivicaService {

  private urlResource = 'api/actividad-civicas';
  private actividadCivicaFilter = new BehaviorSubject<any>(new ActividadCivicaFilter());

  constructor(protected http: HttpClient) {
  }

  sendActividadCivicaFilter(object: any) {
    this.actividadCivicaFilter.next(object);
  }

  currentActividadCivicaFilter(): Observable<any> {
    return this.actividadCivicaFilter.asObservable();
  }

  getActividadCivicaFilter() {
    return this.actividadCivicaFilter.getValue();
  }

  getAllActividadesCivicas(docenteFilter: DocenteFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': docenteFilter.page,
      'size': docenteFilter.size,
      'sort': docenteFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createActividadCivica(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteActividadCivica(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyActividadCivica(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
