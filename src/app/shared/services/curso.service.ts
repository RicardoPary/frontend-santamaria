import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../models/extras/request-util';
import {CursoFilter} from '../models/curso';

@Injectable()
export class CursoService {

  private urlResource = 'api/cursos';
  private cursoFilter = new BehaviorSubject<any>(new CursoFilter);

  constructor(protected http: HttpClient) {
  }

  sendCursoFilter(object: any) {
    this.cursoFilter.next(object);
  }

  currentCursoFilter(): Observable<any> {
    return this.cursoFilter.asObservable();
  }

  getCursoFilter() {
    return this.cursoFilter.getValue();
  }

  getAllCursos(cursoFilter: CursoFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': cursoFilter.page,
      'size': cursoFilter.size,
      'sort': cursoFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createCurso(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteCurso(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyCurso(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
