import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {createRequestOption} from '../models/extras/request-util';
import {DocenteFilter} from '../models/docente';

@Injectable()
export class ContractService {

  private urlResource = 'api/docentes';
  private docenteFilter = new BehaviorSubject<any>(new DocenteFilter);

  constructor(protected http: HttpClient) {
  }

  sendDocenteFilter(object: any) {
    this.docenteFilter.next(object);
  }

  currentDocenteFilter(): Observable<any> {
    return this.docenteFilter.asObservable();
  }

  getDocenteFilter() {
    return this.docenteFilter.getValue();
  }

  getAllDocentes(docenteFilter: DocenteFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': docenteFilter.page,
      'size': docenteFilter.size,
      'sort': docenteFilter.sort
    });
    return this.http.get(`${this.urlResource}/all`, {params: params, observe: 'response'});
  }

  createDocente(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteDocente(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyDocente(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
