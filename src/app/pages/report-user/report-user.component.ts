import {Component, OnInit, DoCheck} from '@angular/core';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {UtilsService} from '../../shared/service/utils.service';
import {Subscription} from 'rxjs/index';
import {InvoiceService} from '../../shared/service/invoice.service';
import {BranchService} from '../../shared/service/branch.service';
import {ReportService} from '../../shared/service/report.service';
import {ReportUser, ReportUserFilter} from '../../shared/model/report.model';

@Component({
  templateUrl: './report-user.component.html'
})
export class ReportUserComponent implements OnInit, DoCheck {

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
  orderNumberValue: any;

  headersColumns: any = [
    {
      name: 'orderNumber',
      displayName: 'Nº Pedido',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'totalAmount',
      displayName: 'Monto',
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

    this.subscriptionProductService = this.reportService.currentReportUserFilter().subscribe(
      reportUser => {
        if (reportUser) {
          this.filtersColumns = reportUser.reportUser;

          this.fromDate = {
            'year': parseFloat(reportUser.reportUser.fromDate.substring(0, 4)),
            'month': parseFloat(reportUser.reportUser.fromDate.substring(5, 7)),
            'day': parseFloat(reportUser.reportUser.fromDate.substring(8, 10))
          };
          this.minDateTo = {
            'year': parseFloat(reportUser.reportUser.fromDate.substring(0, 4)),
            'month': parseFloat(reportUser.reportUser.fromDate.substring(5, 7)),
            'day': parseFloat(reportUser.reportUser.fromDate.substring(8, 10))
          };
          this.toDate = {
            'year': parseFloat(reportUser.reportUser.toDate.substring(0, 4)),
            'month': parseFloat(reportUser.reportUser.toDate.substring(5, 7)),
            'day': parseFloat(reportUser.reportUser.toDate.substring(8, 10))
          };

          this.orderNumberValue = reportUser.reportUser.orderNumber;

          this.pageSize = reportUser.size;
          this.page = reportUser.page;
          this.branchService.currentIdBranch().subscribe(
            idBranch => {
              if (idBranch) {
                this.idBranch = idBranch;
                reportUser.reportUser.idBranch = idBranch;
                this.callService(reportUser);
              }
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  clickEvent() {
    this.status = !this.status;
  }

  callService(reportUserFilter: ReportUserFilter) {
    this.subscriptionTable = this.reportService.getOrdersReport(reportUserFilter).subscribe(res => {
      this.totalProducts = parseFloat(res.headers.get('X-Total-Count'));
      this.products = res.body;
    });
  }

  clickPagination(event: any) {
    const filter = this.reportService.getReportUserFilter();
    filter.page = (event.newPage) - 1;
    this.reportService.sendReportUserFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.reportService.getReportUserFilter();
    filter.sort = [event.column + ',' + state];
    this.reportService.sendReportUserFilter(filter);
  }

  submitFromDate(event) {
    this.minDateTo = event;
    const fromDate = event.year + '-' +
      (event.month < 10 ? '0' + event.month : event.month) + '-' +
      (event.day < 10 ? '0' + event.day : event.day);
    const filter = this.reportService.getReportUserFilter();
    filter.reportUser.fromDate = fromDate;
    filter.page = 0;
    this.reportService.sendReportUserFilter(filter);
    this.page = 0;
  }

  submitToDate(event) {
    const toDate = event.year + '-' +
      (event.month < 10 ? '0' + event.month : event.month) + '-' +
      (event.day < 10 ? '0' + event.day : event.day);
    const filter = this.reportService.getReportUserFilter();
    filter.reportUser.toDate = toDate;
    filter.page = 0;
    this.reportService.sendReportUserFilter(filter);
    this.page = 0;
  }

  submitOrderNumber(form) {
    const filter = this.reportService.getReportUserFilter();
    filter.reportUser.orderNumber = form.value.orderNumber ? form.value.orderNumber : '';
    filter.page = 0;
    this.reportService.sendReportUserFilter(filter);
    this.page = 0;
  }

  reset() {
    this.reportService.sendReportUserFilter(new ReportUserFilter());
  }

  ngDoCheck() {
    const newFilter = new ReportUser();
    newFilter.idBranch = this.idBranch;
    this.statusReset = JSON.stringify(this.filtersColumns) === JSON.stringify(newFilter) ? false : true;
  }
}
