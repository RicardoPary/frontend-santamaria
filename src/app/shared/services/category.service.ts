import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {StaffFilter} from '../models/staff.model';
import {createRequestOption} from '../models/extras/request-util';
import {CategoryFilter} from '../models/category.model';

@Injectable()
export class CategoryService {

  private urlResource = 'api/categories';
  private categoryFilter = new BehaviorSubject<any>(new CategoryFilter());

  constructor(private http: HttpClient) {
  }

  sendCategoryFilter(object: any) {
    this.categoryFilter.next(object);
  }

  currentCategoryFilter(): Observable<any> {
    return this.categoryFilter.asObservable();
  }

  getCategoryFilter() {
    return this.categoryFilter.getValue();
  }

  getAllCategories(categoryFilter: CategoryFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': categoryFilter.page,
      'size': categoryFilter.size,
      'sort': categoryFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  getCategory(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  createCategory(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteCategory(id): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyCategory(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
