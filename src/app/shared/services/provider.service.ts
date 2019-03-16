import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {BehaviorSubject} from 'rxjs/index';
import {ProviderFilter} from '../models/provider';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class ProviderService {

  private urlResource = 'api/providers';
  private providerFilter = new BehaviorSubject<any>(new ProviderFilter);

  constructor(private http: HttpClient) {
  }

  sendProviderFilter(object: any) {
    this.providerFilter.next(object);
  }

  currentProviderFilter(): Observable<any> {
    return this.providerFilter.asObservable();
  }

  getProviderFilter() {
    return this.providerFilter.getValue();
  }

  createProvider(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteProvider(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  getAllProviders(providerFilter: ProviderFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': providerFilter.page,
      'size': providerFilter.size,
      'sort': providerFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }
}
