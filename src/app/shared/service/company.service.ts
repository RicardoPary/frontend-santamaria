import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';

@Injectable()
export class CompanyService  {
  private resourceUrl = 'api/companies';
  constructor(private http: HttpClient) { }

  getCompany(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.resourceUrl}/current_provider`, {observe: 'response'});
  }
  update(company: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.resourceUrl}/current_provider`, company, {observe: 'response'});
  }
}
