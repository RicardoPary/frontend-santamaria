import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';

@Injectable()
export class BranchService {

  private urlResource = 'api/branches';

  private idBranch = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  getAllByIdCompany(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${id}/company`, {observe: 'response'});
  }

  getBranchById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  sendIdBranch(id: any) {
    this.idBranch.next(id);
  }

  currentIdBranch() {
    return this.idBranch.asObservable();
  }

  getIdBranch() {
    return this.idBranch.getValue();
  }
}
