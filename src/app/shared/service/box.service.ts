import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable()
export class BoxService {

  private urlResource = 'api/boxes';

  private idBranch = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  getAllBoxes(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  createBox(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  updateBox(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllBoxesAuditory(): Observable<HttpResponse<any>> {
    return this.http.get('api/boxes-auditory', {observe: 'response'});
  }

  createBoxDTO(body: any): Observable<HttpResponse<any>> {
    return this.http.post('api/boxes-dto', body, {observe: 'response'});
  }

  updateBoxDTO(body: any): Observable<HttpResponse<any>> {
    return this.http.put('api/boxes-dto', body, {observe: 'response'});
  }

  getBoxDTO(): Observable<HttpResponse<any>> {
    return this.http.get('api/boxes-dto', {observe: 'response'});
  }
}
