import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {FilterInventory} from '../models/inventory';
import {BehaviorSubject} from 'rxjs/index';

@Injectable()
export class InventoryService {

  private urlResource = 'api/inventories';
  private filterInventoris = new BehaviorSubject<any>(new FilterInventory);

  constructor(private http: HttpClient) {
  }

  sendFilterInventoris(object: any) {
    this.filterInventoris.next(object);
  }

  currentFilterInventoris(): Observable<any> {
    return this.filterInventoris.asObservable();
  }

  getFilterInventoris() {
    return this.filterInventoris.getValue();
  }

  getAllInventory(filterInventory: FilterInventory): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}?page=${filterInventory.page}&size=${filterInventory.size}&sort=${filterInventory.sort}`,
      {observe: 'response'});
  }

  postInventory(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteInventory(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  putInventory(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllByIdProvider(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${id}/provider`, {observe: 'response'});
  }
}
