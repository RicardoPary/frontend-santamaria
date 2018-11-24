import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../models/extras/request-util';
import {InscripcionFilter} from '../models/inscripcion';

@Injectable()
export class InscripcionService {

  private urlResource = 'api/estudiante-cursos';
  private inscripcionFilter = new BehaviorSubject<any>(new InscripcionFilter());

  constructor(protected http: HttpClient) {
  }

  sendInscripcionFilter(object: any) {
    this.inscripcionFilter.next(object);
  }

  currentInscripcionFilter(): Observable<any> {
    return this.inscripcionFilter.asObservable();
  }

  getInscripcionFilter() {
    return this.inscripcionFilter.getValue();
  }

  getAllInscripciones(inscripcionFilter: InscripcionFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': inscripcionFilter.page,
      'size': inscripcionFilter.size,
      'sort': inscripcionFilter.sort
    });
    return this.http.get('api/inscripciones', {params: params, observe: 'response'});
  }

  createInscripcion(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteInscripcion(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyInscripcion(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
