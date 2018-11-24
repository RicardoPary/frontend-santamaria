import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {BehaviorSubject} from 'rxjs/index';
import {ProviderFilter} from '../model/provider';
import {createRequestOption} from '../model/extras/request-util';

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

  getAllProviders(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  getAllProvidersByFilter(providerFilter: ProviderFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': providerFilter.page,
      'size': providerFilter.size,
      'sort': providerFilter.sort,
      'company.contains': providerFilter.provider.company,
      'idBranch.equals': providerFilter.provider.idBranch,
      'name.contains': providerFilter.provider.name
    });

    return this.http.get(`${this.urlResource}/all`, {params: params, observe: 'response'});
  }
}
