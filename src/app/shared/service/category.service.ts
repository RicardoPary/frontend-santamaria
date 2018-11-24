import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class CategoryService {

  private urlResource = 'api/categories';

  constructor(private http: HttpClient) {
  }

  getCategory(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  postCategory(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteCategory(id): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  putCategory(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllByIdBranch(id: any): Observable<HttpResponse<any>> {
  return this.http.get(`${this.urlResource}/${id}/branch`, {observe: 'response'});
  }
}
