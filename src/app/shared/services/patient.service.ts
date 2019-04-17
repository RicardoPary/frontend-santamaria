import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../models/extras/request-util';
import {PatientFilter} from '../models/patient.model';

@Injectable()
export class PatientService {

  private urlResource = 'api/patients';
  private patientFilter = new BehaviorSubject<any>(new PatientFilter());

  constructor(protected http: HttpClient) {
  }

  sendPatientFilter(object: any) {
    this.patientFilter.next(object);
  }

  currentPatientFilter(): Observable<any> {
    return this.patientFilter.asObservable();
  }

  getPatientFilter() {
    return this.patientFilter.getValue();
  }

  getAllPatients(patientFilter: PatientFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': patientFilter.page,
      'size': patientFilter.size,
      'sort': patientFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createPatient(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deletePatient(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyPatient(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
