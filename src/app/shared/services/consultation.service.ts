import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {ConsultationFilter} from '../models/consultation.model';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class ConsultationService {

  private urlResource = 'api/consultations';
  private consultationFilter = new BehaviorSubject<any>(new ConsultationFilter());

  constructor(private http: HttpClient) {
  }

  sendConsultationFilter(object: any) {
    this.consultationFilter.next(object);
  }

  currentConsultationFilter(): Observable<any> {
    return this.consultationFilter.asObservable();
  }

  getConsultationFilter() {
    return this.consultationFilter.getValue();
  }

  getAllConsultations(consultationFilter: ConsultationFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': consultationFilter.page,
      'size': consultationFilter.size,
      'sort': consultationFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createConsultation(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteConsultation(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyConsultation(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

}
