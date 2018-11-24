import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class PersonaService {

  private urlResource = 'api/personas';

  constructor(protected http: HttpClient) {
  }

  getAllPersonas(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/all`, {observe: 'response'});
  }

  createPersona(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deletePersona(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyPersona(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
