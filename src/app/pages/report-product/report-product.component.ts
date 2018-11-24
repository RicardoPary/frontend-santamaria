import {Component, OnInit, DoCheck} from '@angular/core';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {Subscription, throwError} from 'rxjs/index';
import {ReportService} from '../../shared/service/report.service';
import {ReportProduct, ReportProductFilter} from '../../shared/model/report.model';
import {BranchService} from '../../shared/service/branch.service';
import {catchError} from 'rxjs/internal/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  templateUrl: './report-product.component.html'
})
export class ReportProductComponent implements OnInit, DoCheck {

  subscriptionTable: Subscription;
  subscriptionProductService: Subscription;
  statusReset = false;

  products: any = [];

  filtersColumns: any;
  totalProducts = 10;
  pageSize = 10;
  page = 0;

  date = {
    'year': new Date().getFullYear(),
    'month': new Date().getMonth() + 1,
    'day': new Date().getDate()
  };
  minDateTo = null;
  status = false;
  fromDate: any;
  toDate: any;

  idBranch: any;

  headersColumns: any = [
    {
      name: 'id',
      displayName: 'Codigo',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'name',
      displayName: 'Nombre Producto',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'initialAvailableQuantity',
      displayName: 'Cantidad disponible inicial',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'finalAvailableQuantity',
      displayName: 'Cantidad disponible final',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'quantitySold',
      displayName: 'Cantidad vendida',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'salePrice',
      displayName: 'Precio de venta',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'wholesalePrice',
      displayName: 'Precio por mayor',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'number'
    },
    {
      name: 'purchasePrice',
      displayName: 'Precio de compra',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    }
  ];

  constructor(private calendar: NgbCalendar,
              private reportService: ReportService,
              private branchService: BranchService) {

    this.subscriptionProductService = this.reportService.currentReportProductFilter().subscribe(
      reportProduct => {
        if (reportProduct) {
          this.filtersColumns = reportProduct.reportProduct;

          this.fromDate = {
            'year': parseFloat(reportProduct.reportProduct.fromDate.substring(0, 4)),
            'month': parseFloat(reportProduct.reportProduct.fromDate.substring(5, 7)),
            'day': parseFloat(reportProduct.reportProduct.fromDate.substring(8, 10))
          };
          this.minDateTo = {
            'year': parseFloat(reportProduct.reportProduct.fromDate.substring(0, 4)),
            'month': parseFloat(reportProduct.reportProduct.fromDate.substring(5, 7)),
            'day': parseFloat(reportProduct.reportProduct.fromDate.substring(8, 10))
          };
          this.toDate = {
            'year': parseFloat(reportProduct.reportProduct.toDate.substring(0, 4)),
            'month': parseFloat(reportProduct.reportProduct.toDate.substring(5, 7)),
            'day': parseFloat(reportProduct.reportProduct.toDate.substring(8, 10))
          };

          this.pageSize = reportProduct.size;
          this.page = reportProduct.page;
          this.branchService.currentIdBranch().subscribe(
            idBranch => {
              if (idBranch) {
                this.idBranch = idBranch;
                reportProduct.reportProduct.idBranch = idBranch;
                this.callService(reportProduct);
              }
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  callService(reportProductFilter: ReportProductFilter) {
    this.subscriptionTable = this.reportService.getReportProducts(reportProductFilter)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err))
      ).subscribe(res => {
      this.totalProducts = parseFloat(res.headers.get('X-Total-Count'));
      this.products = res.body;
    });
  }

  clickEvent() {
    this.status = !this.status;
  }

  clickPagination(event: any) {
    const filter = this.reportService.getReportProductFilter();
    filter.page = (event.newPage) - 1;
    this.reportService.sendReportProductFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.reportService.getReportProductFilter();
    filter.sort = [event.column + ',' + state];
    this.reportService.sendReportProductFilter(filter);
  }

  submitFromDate(event) {
    this.minDateTo = event;
    const fromDate = event.year + '-' +
      (event.month < 10 ? '0' + event.month : event.month) + '-' +
      (event.day < 10 ? '0' + event.day : event.day);
    const filter = this.reportService.getReportProductFilter();
    filter.reportProduct.fromDate = fromDate;
    filter.page = 0;
    this.reportService.sendReportProductFilter(filter);
    this.page = 0;
  }

  submitToDate(event) {
    const toDate = event.year + '-' +
      (event.month < 10 ? '0' + event.month : event.month) + '-' +
      (event.day < 10 ? '0' + event.day : event.day);
    const filter = this.reportService.getReportProductFilter();
    filter.reportProduct.toDate = toDate;
    filter.page = 0;
    this.reportService.sendReportProductFilter(filter);
    this.page = 0;
  }

  reset() {
    this.reportService.sendReportProductFilter(new ReportProductFilter());
  }

  ngDoCheck() {
    const newFilter = new ReportProduct();
    newFilter.idBranch = this.idBranch;
    this.statusReset = JSON.stringify(this.filtersColumns) === JSON.stringify(newFilter) ? false : true;
  }
}
