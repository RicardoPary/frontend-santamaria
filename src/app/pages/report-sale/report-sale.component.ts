import {Component, OnInit, OnDestroy, DoCheck} from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UtilsService} from '../../shared/service/utils.service';
import {Subscription} from 'rxjs/index';
import {ReportSale, ReportSaleFilter} from '../../shared/model/report.model';
import {InvoiceService} from '../../shared/service/invoice.service';
import {BranchService} from '../../shared/service/branch.service';
import {ReportService} from '../../shared/service/report.service';

@Component({
  templateUrl: './report-sale.component.html'
})
export class ReportSaleComponent implements OnInit, OnDestroy, DoCheck {

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
  productValue: any;
  userValue: any;

  headersColumns: any = [
    {
      name: 'detail',
      displayName: 'Nombre producto',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'quantity',
      displayName: 'Cantidad producto',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'price',
      displayName: 'Precio de venta',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'orderNumber',
      displayName: 'Nº pedido',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'date',
      displayName: 'Fecha',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'date'
    },
    {
      name: 'createdBy',
      displayName: 'Usuario',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    }
  ];

  constructor(private utilsService: UtilsService,
              private  calendar: NgbCalendar,
              private invoiceService: InvoiceService,
              private branchService: BranchService,
              private reportService: ReportService) {

    this.subscriptionProductService = this.reportService.currentReportSaleFilter().subscribe(
      reportSale => {
        if (reportSale) {
          this.filtersColumns = reportSale.reportSale;

          this.fromDate = {
            'year': parseFloat(reportSale.reportSale.fromDate.substring(0, 4)),
            'month': parseFloat(reportSale.reportSale.fromDate.substring(5, 7)),
            'day': parseFloat(reportSale.reportSale.fromDate.substring(8, 10))
          };
          this.minDateTo = {
            'year': parseFloat(reportSale.reportSale.fromDate.substring(0, 4)),
            'month': parseFloat(reportSale.reportSale.fromDate.substring(5, 7)),
            'day': parseFloat(reportSale.reportSale.fromDate.substring(8, 10))
          };
          this.toDate = {
            'year': parseFloat(reportSale.reportSale.toDate.substring(0, 4)),
            'month': parseFloat(reportSale.reportSale.toDate.substring(5, 7)),
            'day': parseFloat(reportSale.reportSale.toDate.substring(8, 10))
          };

          this.productValue = reportSale.reportSale.product;
          this.userValue = reportSale.reportSale.user;

          this.pageSize = reportSale.size;
          this.page = reportSale.page;
          this.branchService.currentIdBranch().subscribe(
            idBranch => {
              if (idBranch) {
                this.idBranch = idBranch;
                reportSale.reportSale.idBranch = idBranch;
                this.callService(reportSale);
              }
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionTable ? this.subscriptionTable.unsubscribe() : '';
  }

  clickEvent() {
    this.status = !this.status;
  }

  callService(reportSaleFilter: ReportSaleFilter) {
    this.subscriptionTable = this.reportService.getReportInvoice(reportSaleFilter).subscribe(res => {
      this.totalProducts = parseFloat(res.headers.get('X-Total-Count'));
      this.products = res.body;
    });
  }

  clickPagination(event: any) {
    const filter = this.reportService.getReportSaleFilter();
    filter.page = (event.newPage) - 1;
    this.reportService.sendReportSaleFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.reportService.getReportSaleFilter();
    filter.sort = [event.column + ',' + state];
    this.reportService.sendReportSaleFilter(filter);
  }

  submitProduct(form) {
    const filter = this.reportService.getReportSaleFilter();
    filter.reportSale.product = form.value.product;
    filter.page = 0;
    this.reportService.sendReportSaleFilter(filter);
    this.page = 0;
  }

  submitUser(form) {
    const filter = this.reportService.getReportSaleFilter();
    filter.reportSale.user = form.value.user;
    filter.page = 0;
    this.reportService.sendReportSaleFilter(filter);
    this.page = 0;
  }

  submitFromDate(event) {
    this.minDateTo = event;
    const fromDate = event.year + '-' + (event.month < 10 ? '0' +
      event.month : event.month) + '-' +
      (event.day < 10 ? '0' + event.day : event.day);
    const filter = this.reportService.getReportSaleFilter();
    filter.reportSale.fromDate = fromDate;
    filter.page = 0;
    this.reportService.sendReportSaleFilter(filter);
    this.page = 0;
  }

  submitToDate(event) {
    const toDate = event.year + '-' + (event.month < 10 ? '0' +
      event.month : event.month) + '-' +
      (event.day < 10 ? '0' + event.day : event.day);
    const filter = this.reportService.getReportSaleFilter();
    filter.reportSale.toDate = toDate;
    filter.page = 0;
    this.reportService.sendReportSaleFilter(filter);
    this.page = 0;
  }

  formatDate(date: NgbDateStruct, separator?: string) {
    return this.utilsService.formatDateStruct(date, separator);
  }

  reset() {
    this.reportService.sendReportSaleFilter(new ReportSaleFilter());
  }

  ngDoCheck() {
    const newFilter = new ReportSale();
    newFilter.idBranch = this.idBranch;
    this.statusReset = JSON.stringify(this.filtersColumns) === JSON.stringify(newFilter) ? false : true;
  }
}
