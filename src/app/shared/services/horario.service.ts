import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MateriaFilter} from '../models/materia';
import {createRequestOption} from '../models/extras/request-util';
import {HorarioFilter} from '../models/horario';

@Injectable()
export class HorarioService {

  private urlResource = 'api/horarios';
  private horarioFilter = new BehaviorSubject<any>(new HorarioFilter);

  constructor(protected http: HttpClient) {
  }

  sendHorarioFilter(object: any) {
    this.horarioFilter.next(object);
  }

  currentHorarioFilter(): Observable<any> {
    return this.horarioFilter.asObservable();
  }

  getHorarioFilter() {
    return this.horarioFilter.getValue();
  }

  getAllHorarios(horarioFilter: HorarioFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': horarioFilter.page,
      'size': horarioFilter.size,
      'sort': horarioFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createHorario(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteHorario(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyHorario(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
