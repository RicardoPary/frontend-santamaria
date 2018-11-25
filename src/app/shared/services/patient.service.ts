import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {EstudianteFilter} from '../models/estudiante';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class PatientService {

  private urlResource = 'api/estudiantes';
  private estudianteFilter = new BehaviorSubject<any>(new EstudianteFilter);

  constructor(protected http: HttpClient) {
  }

  sendEstudianteFilter(object: any) {
    this.estudianteFilter.next(object);
  }

  currentEstudianteFilter(): Observable<any> {
    return this.estudianteFilter.asObservable();
  }

  getEstudianteFilter() {
    return this.estudianteFilter.getValue();
  }

  getAllEstudiantes(estudianteFilter: EstudianteFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': estudianteFilter.page,
      'size': estudianteFilter.size,
      'sort': estudianteFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createEstudiante(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteEstudiante(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyEstudiante(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
