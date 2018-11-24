import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {BehaviorSubject} from 'rxjs/index';
import {ReportProductFilter, ReportSaleFilter, ReportUserFilter} from '../model/report.model';
import {map} from 'rxjs/internal/operators';
import {createRequestOption} from '../model/extras/request-util';

@Injectable()
export class ReportService {

  private reportProductFilter = new BehaviorSubject<any>(new ReportProductFilter());
  private reportSaleFilter = new BehaviorSubject<any>(new ReportSaleFilter());
  private reportUserFilter = new BehaviorSubject<any>(new ReportUserFilter());

  private invoicesPerHour = new BehaviorSubject<any>(null);
  private ordersPerMonth = new BehaviorSubject<any>(null);
  private ordersPerMonthAndYear = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  sendReportProductFilter(object: any) {
    this.reportProductFilter.next(object);
  }

  currentReportProductFilter(): Observable<any> {
    return this.reportProductFilter.asObservable();
  }

  getReportProductFilter() {
    return this.reportProductFilter.getValue();
  }

  sendReportSaleFilter(object: any) {
    this.reportSaleFilter.next(object);
  }

  currentReportSaleFilter(): Observable<any> {
    return this.reportSaleFilter.asObservable();
  }

  getReportSaleFilter() {
    return this.reportSaleFilter.getValue();
  }


  sendReportUserFilter(object: any) {
    this.reportUserFilter.next(object);
  }

  currentReportUserFilter(): Observable<any> {
    return this.reportUserFilter.asObservable();
  }

  getReportUserFilter() {
    return this.reportUserFilter.getValue();
  }


  sentOrdersPerMonth(object: any) {
    this.ordersPerMonth.next(object);
  }

  sentInvoicesPerHour(object: any) {
    this.invoicesPerHour.next(object);
  }

  sentOrdersPerMonthAndYear(object: any) {
    this.ordersPerMonthAndYear.next(object);
  }

  getOrdersPerMonth(idBranch: any, year: any, force: boolean): Observable<HttpResponse<any>> {
    if (this.ordersPerMonth.getValue() && !force) {
      return new Observable(observer => observer.next(this.ordersPerMonth.getValue()));
    }
    return this.http.get(`api/invoice-date-year/${idBranch}-${year}`, {observe: 'response'}).pipe(
      map(res => {
        if (res) {
          this.ordersPerMonth.next(res);
          return this.ordersPerMonth.getValue();
        }
      })
    );
  }

  getInvoicesPerHour(idBranch: any, force: boolean): Observable<HttpResponse<any>> {
    if (this.invoicesPerHour.getValue() && !force) {
      return new Observable(observer => observer.next(this.invoicesPerHour.getValue()));
    }
    return this.http.get(`api/invoice-hour/${idBranch}`, {observe: 'response'}).pipe(
      map(res => {
        if (res) {
          this.invoicesPerHour.next(res);
          return this.invoicesPerHour.getValue();
        }
      })
    );
  }

  getOrdersPerMonthAndYear(idBranch: any, month: any, year: any, force: boolean): Observable<HttpResponse<any>> {
    if (this.ordersPerMonthAndYear.getValue() && !force) {
      return new Observable(observer => observer.next(this.ordersPerMonthAndYear.getValue()));
    }
    return this.http.get(`api/invoice-date-month-year/${idBranch}-${month}-${year}`, {observe: 'response'}).pipe(
      map(res => {
        if (res) {
          this.ordersPerMonthAndYear.next(res);
          return this.ordersPerMonthAndYear.getValue();
        }
      })
    );
  }

  getInvoicesByDate(idBranch: any): Observable<HttpResponse<any>> {
    return this.http.get(`api/invoice-date/${idBranch}`, {observe: 'response'});
  }

  getOrdersByDate(idBranch: any): Observable<HttpResponse<any>> {
    return this.http.get(`api/orderinvoice-date/${idBranch}`, {observe: 'response'});
  }

  getProductExist(idBranch: any): Observable<HttpResponse<any>> {
    return this.http.get(`api/products-exists/${idBranch}`, {observe: 'response'});
  }

  getBoxesByDate(idBranch: any): Observable<HttpResponse<any>> {
    return this.http.get(`api/box-date/${idBranch}`, {observe: 'response'});
  }

  getOrdersReport(reportUserFilter: ReportUserFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': reportUserFilter.page,
      'size': reportUserFilter.size,
      'sort': reportUserFilter.sort,
      'idBranch': reportUserFilter.reportUser.idBranch,
      'orderNumber': reportUserFilter.reportUser.orderNumber,
      'fromDate': reportUserFilter.reportUser.fromDate,
      'toDate': reportUserFilter.reportUser.toDate
    });
    return this.http.get(`api/invoice-report-orders`, {observe: 'response', params: params});
  }

  getReportInvoice(reportSaleFilter: ReportSaleFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': reportSaleFilter.page,
      'size': reportSaleFilter.size,
      'sort': reportSaleFilter.sort,
      'idBranch': reportSaleFilter.reportSale.idBranch,
      'product': reportSaleFilter.reportSale.product,
      'user': reportSaleFilter.reportSale.user,
      'fromDate': reportSaleFilter.reportSale.fromDate,
      'toDate': reportSaleFilter.reportSale.toDate
    });
    return this.http.get(`api/invoices-report`, {observe: 'response', params: params});
  }

  getReportProducts(reportProductFilter: ReportProductFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': reportProductFilter.page,
      'size': reportProductFilter.size,
      'sort': reportProductFilter.sort,
      'idBranch': reportProductFilter.reportProduct.idBranch,
      'fromDate': reportProductFilter.reportProduct.fromDate,
      'toDate': reportProductFilter.reportProduct.toDate
    });
    return this.http.get(`api/products-report`, {observe: 'response', params: params});
  }
}
