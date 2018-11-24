import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {createRequestOption} from '../models/extras/request-util';
import {DocenteFilter} from '../models/docente';
import {PlantelAdministrativoFilter} from '../models/plantel-administrativo';

@Injectable()
export class PlantelAdministrativoService {

  private urlResource = 'api/plantel-administrativos';
  private plantelAdministrativoFilter = new BehaviorSubject<any>(new PlantelAdministrativoFilter);

  constructor(protected http: HttpClient) {
  }

  sendPlantelAdministrativoFilter(object: any) {
    this.plantelAdministrativoFilter.next(object);
  }

  currentPlantelAdministrativoFilter(): Observable<any> {
    return this.plantelAdministrativoFilter.asObservable();
  }

  getPlantelAdministrativoFilter() {
    return this.plantelAdministrativoFilter.getValue();
  }

  getAllPlantelAdministrativos(docenteFilter: DocenteFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': docenteFilter.page,
      'size': docenteFilter.size,
      'sort': docenteFilter.sort
    });
    return this.http.get(`${this.urlResource}/all`, {params: params, observe: 'response'});
  }

  createPlantelAdministrativo(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deletePlantelAdministrativo(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyPlantelAdministrativo(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
