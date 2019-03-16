import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import {createRequestOption} from '../models/extras/request-util';
import {SupplyFilter} from '../models/supply.model';

@Injectable()
export class SupplyService {

  private urlResource = 'api/supplies';
  private supplyFilter = new BehaviorSubject<any>(new SupplyFilter());

  constructor(protected http: HttpClient) {
  }

  sendSupplyFilter(object: any) {
    this.supplyFilter.next(object);
  }

  currentSupplyFilter(): Observable<any> {
    return this.supplyFilter.asObservable();
  }

  getSupplyFilter() {
    return this.supplyFilter.getValue();
  }

  getAllSupplies(supplyFilter: SupplyFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': supplyFilter.page,
      'size': supplyFilter.size,
      'sort': supplyFilter.sort,
      'name.contains': supplyFilter.supply.name,
      'stock.equals': supplyFilter.supply.stock,
      'salePrice.equals' : supplyFilter.supply.salePrice,
      'inventory.equals': supplyFilter.supply.inventory,
      'categoryId.equals': supplyFilter.supply.idCategory
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createSupply(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteSupply(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifySupply(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
