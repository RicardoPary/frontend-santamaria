import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {createRequestOption} from '../models/extras/request-util';
import {StaffFilter} from '../models/staff.model';

@Injectable()
export class StaffService {

  private urlResource = 'api/staff';
  private staffFilter = new BehaviorSubject<any>(new StaffFilter());

  constructor(protected http: HttpClient) {
  }

  sendStaffFilter(object: any) {
    this.staffFilter.next(object);
  }

  currentStaffFilter(): Observable<any> {
    return this.staffFilter.asObservable();
  }

  getStaffFilter() {
    return this.staffFilter.getValue();
  }

  getAllStaff(staffFilter: StaffFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': staffFilter.page,
      'size': staffFilter.size,
      'sort': staffFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createStaff(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteStaff(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyStaff(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
