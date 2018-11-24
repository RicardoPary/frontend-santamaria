import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MateriaFilter} from '../models/materia';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class MateriaService {

  private urlResource = 'api/materias';
  private materiaFilter = new BehaviorSubject<any>(new MateriaFilter);

  constructor(protected http: HttpClient) {
  }

  sendMateriaFilter(object: any) {
    this.materiaFilter.next(object);
  }

  currentMateriaFilter(): Observable<any> {
    return this.materiaFilter.asObservable();
  }

  getMateriaFilter() {
    return this.materiaFilter.getValue();
  }

  getAllMaterias(materiaFilter: MateriaFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': materiaFilter.page,
      'size': materiaFilter.size,
      'sort': materiaFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createMateria(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteMateria(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyMateria(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllMateriasByIdCurso(idCurso: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${idCurso}/curso`, {observe: 'response'});
  }

  getAllMateriasByIdcursoAndIdDocente(idCurso: any, idDocente: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${idCurso}/curso/${idDocente}/docente`, {observe: 'response'});
  }
}
