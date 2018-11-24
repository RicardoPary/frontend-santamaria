import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BimestreFilter} from '../models/bimestre';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class BimestreService {

  private urlResource = 'api/bimestres';
  private bimestreFilter = new BehaviorSubject<any>(new BimestreFilter);

  constructor(protected http: HttpClient) {
  }

  getBimestreFilter() {
    return this.bimestreFilter.getValue();
  }

  sendBimestreFilter(object: any) {
    this.bimestreFilter.next(object);
  }

  currentBimestreFilter(): Observable<any> {
    return this.bimestreFilter.asObservable();
  }

  getAllBimestresByFilter(bimestreFilter: BimestreFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': bimestreFilter.page,
      'size': bimestreFilter.size,
      'sort': bimestreFilter.sort,
      'name.contains': bimestreFilter.bimestre.name,
      'bimestre.equals': bimestreFilter.bimestre.bimestre,
      'gestion.equals' : bimestreFilter.bimestre.gestion,
      'idDocente.equals': bimestreFilter.bimestre.idDocente,
      'idEstudiante.equals': bimestreFilter.bimestre.idEstudiante,
      'idMateria.equals': bimestreFilter.bimestre.idMateria
    });

    return this.http.get(`${this.urlResource}/all`, {params: params, observe: 'response'});
  }

  createBimestre(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteBimestre(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyBimestre(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
