import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class InvoiceService {

  private urlResource = 'api/invoices';

  constructor(private http: HttpClient) {
  }

  getInvoice(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  deleteInvoice(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  putInvoice(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  postInvoice(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  postInvoiceDTO(body: any): Observable<HttpResponse<any>> {
    return this.http.post('api/invoice-dto', body, {observe: 'response'});
  }

  getDownloadFileInvoiceById(id, req?: any): Observable<HttpResponse<Blob>> {
    return this.http.get(`api/invoices/${id}/donwload-invoice-pdf`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
