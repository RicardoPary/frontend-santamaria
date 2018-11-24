import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {BehaviorSubject} from 'rxjs/index';
import {ProductFilter} from '../model/product';
import {createRequestOption} from '../model/extras/request-util';

@Injectable()
export class ProductService {

  private urlResource = 'api/products';
  private productFilter = new BehaviorSubject<any>(new ProductFilter());

  constructor(private http: HttpClient) {
  }

  sendProductFilter(object: any) {
    this.productFilter.next(object);
  }

  currentProductFilter(): Observable<any> {
    return this.productFilter.asObservable();
  }

  getProductFilter() {
    return this.productFilter.getValue();
  }

  createProduct(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteProduct(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  deleteProductByCategory(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/category/${id}`, {observe: 'response'});
  }

  modifyProduct(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllProductsByFilter(productFilter: ProductFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': productFilter.page,
      'size': productFilter.size,
      'sort': productFilter.sort,
      'name.contains': productFilter.product.name,
      'stock.equals': productFilter.product.stock,
      'salePrice.equals' : productFilter.product.salePrice,
      'inventory.equals': productFilter.product.inventory,
      'idBranch.equals': productFilter.product.idBranch,
      'categoryId.equals': productFilter.product.idCategory
    });
    return this.http.get(`${this.urlResource}/all`, {params: params, observe: 'response'});
  }
}
