import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {createRequestOption} from '../models/extras/request-util';
import {TutorFilter} from '../models/tutor';

@Injectable()
export class TutorService {

  private urlResource = 'api/familiars';
  private tutorFilter = new BehaviorSubject<any>(new TutorFilter);

  constructor(protected http: HttpClient) {
  }

  sendTutorFilter(object: any) {
    this.tutorFilter.next(object);
  }

  currentTutorFilter(): Observable<any> {
    return this.tutorFilter.asObservable();
  }

  getTutorFilter() {
    return this.tutorFilter.getValue();
  }

  getAllTutores(tutorFilter: TutorFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': tutorFilter.page,
      'size': tutorFilter.size,
      'sort': tutorFilter.sort
    });
    return this.http.get(`${this.urlResource}/all`, {params: params, observe: 'response'});
  }

  createTutor(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteTutor(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyTutor(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
