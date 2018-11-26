import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {FilterInventory} from '../models/inventory';
import {BehaviorSubject} from 'rxjs/index';
import {createRequestOption} from '../models/extras/request-util';
import {ConsultationDetailsFilter} from '../models/consultation-details.model';

@Injectable()
export class ConsultationDetailsService {

  private urlResource = 'api/consultation-details';
  private consultationDetailsFilter = new BehaviorSubject<any>(new FilterInventory);

  constructor(private http: HttpClient) {
  }

  sendConsultationDetailsFilter(object: any) {
    this.consultationDetailsFilter.next(object);
  }

  currentConsultationDetailsFilter(): Observable<any> {
    return this.consultationDetailsFilter.asObservable();
  }

  getConsultationDetailsFilter() {
    return this.consultationDetailsFilter.getValue();
  }

  getAllConsultationDetails(consultationDetailsFilter: ConsultationDetailsFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': consultationDetailsFilter.page,
      'size': consultationDetailsFilter.size,
      'sort': consultationDetailsFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createConsultationDetails(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteConsultationDetails(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyConsultationDetails(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllByIdConsultation(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${id}/consultation`, {observe: 'response'});
  }
}
