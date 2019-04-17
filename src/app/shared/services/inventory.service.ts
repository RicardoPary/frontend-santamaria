import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {FilterInventory} from '../models/inventory';
import {BehaviorSubject} from 'rxjs/index';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class InventoryService {

  private urlResource = 'api/inventories';
  private inventoryFilter = new BehaviorSubject<any>(new FilterInventory);

  constructor(private http: HttpClient) {
  }

  sendInventoryFilter(object: any) {
    this.inventoryFilter.next(object);
  }

  currentInventoryFilter(): Observable<any> {
    return this.inventoryFilter.asObservable();
  }

  getInventoryFilter() {
    return this.inventoryFilter.getValue();
  }

  getAllInventory(filterInventory: FilterInventory): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': filterInventory.page,
      'size': filterInventory.size,
      'sort': filterInventory.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createInventory(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteInventory(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyInventory(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllByIdProvider(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${id}/provider`, {observe: 'response'});
  }
}
