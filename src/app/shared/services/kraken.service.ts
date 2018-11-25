import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class KrakenService {

  private urlResource = 'api/kraken';

  private branches = new BehaviorSubject<any>(null);
  private economicActivities = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  getAllEconomicActivitis(): Observable<HttpResponse<any>> {
    if (this.economicActivities.getValue()) {
      return new Observable(observer => observer.next(this.economicActivities.getValue()));
    }
    return this.http.get(`${this.urlResource}/economic-activities`, {observe: 'response'}).pipe(
      map(res => {
        if (res) {
          this.economicActivities.next(res);
          return this.economicActivities.getValue();
        }
      })
    );
  }

  getAllBranches(): Observable<HttpResponse<any>> {
    if (this.branches.getValue()) {
      return new Observable(observer => observer.next(this.branches.getValue()));
    }
    return this.http.get(`${this.urlResource}/branches`, {observe: 'response'}).pipe(
      map(res => {
        if (res) {
          this.branches.next(res);
          return this.branches.getValue();
        }
      })
    );
  }

  getTestConnection(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/test-connection`, {observe: 'response'});
  }
}
