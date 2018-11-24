import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {Principal} from '../../shared/auth';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {LAST_YEARS} from '../../shared/constant/years.constant';
import {MONTHS} from '../../shared/constant/months.constant';
import {UtilsService} from '../../shared/service/utils.service';
import {BranchService} from '../../shared/service/branch.service';
import {LocalStorageService} from 'ngx-webstorage';
import {InvoiceService} from '../../shared/service/invoice.service';
import {ProductService} from '../../shared/service/product.service';
import {BoxService} from '../../shared/service/box.service';
import {Subscription} from 'rxjs/index';
import {ReportService} from '../../shared/service/report.service';

declare var require: any;
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {

  date = new Date();
  monthCurrent = this.date.getMonth() + 1;
  yearCurrent = this.date.getFullYear();


  subscriptionSalesReportPerHour: Subscription;
  subscriptionMonthSaleReport: Subscription;
  subscriptionReportDailySale: Subscription;
  subscriptionIdBranch: Subscription;

  branchFilter = '';

  invoices: any = [];
  invoicesPerHour: any = [];
  cantidad: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cantidad1: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  idBranch: any;

  invoicesPerMaY: any = [];
  cantidad3: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  width = 0;
  height = 0;
  total: any = 0;
  months = MONTHS;
  years = LAST_YEARS;

  fromDate: NgbDateStruct;
  page = 1;
  reports = {
    issuedInvoices: 0,
    canceledInvoices: 0,
    activeCycles: 0,
    totalAmount: 0
  };


  count: any;
  countP: any;
  countC: any;
  realMonth: any = ['Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  @HostListener('window:resize') onResize() {
    this.reportService.getInvoicesPerHour(this.idBranch, false).subscribe(res => this.rendererChar1(res.body));
    this.reportService.getOrdersPerMonth(this.idBranch, this.yearCurrent, false).subscribe(res => this.rendererChart2(res.body));
    this.reportService.getOrdersPerMonthAndYear(this.idBranch, this.monthCurrent, this.yearCurrent, false).subscribe(
      res => this.rendererChart3(this.monthCurrent, this.yearCurrent, res.body));
  }

  constructor(private principal: Principal,
              private calendar: NgbCalendar,
              private utilsService: UtilsService,
              private branchService: BranchService,
              private $localStorage: LocalStorageService,
              private invoiceService: InvoiceService,
              private productService: ProductService,
              private boxService: BoxService,
              private reportService: ReportService) {
    this.subscriptionIdBranch = this.branchService.currentIdBranch().subscribe(
      idBranch => {
        if (idBranch) {
          this.idBranch = idBranch;
          this.loadChart1(this.idBranch, true);
          this.loadChart2(this.idBranch, this.yearCurrent, true);
          this.loadChart3(this.idBranch, this.monthCurrent, this.yearCurrent, true);
          this.reportService.getInvoicesByDate(this.idBranch).subscribe(res => this.total = res.body);
          this.reportService.getOrdersByDate(this.idBranch).subscribe(res => this.count = res.body);
          this.reportService.getProductExist(this.idBranch).subscribe(res => this.countP = res.body);
          this.reportService.getBoxesByDate(this.idBranch).subscribe(res => this.countC = res.body);
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionSalesReportPerHour ? this.subscriptionSalesReportPerHour.unsubscribe() : '';
    this.subscriptionMonthSaleReport ? this.subscriptionMonthSaleReport.unsubscribe() : '';
    this.subscriptionReportDailySale ? this.subscriptionReportDailySale.unsubscribe() : '';
    this.subscriptionIdBranch ? this.subscriptionIdBranch.unsubscribe() : '';
  }

  convertMonth(month) {
    return this.realMonth[month - 1];
  }

  changeMonth(value) {
    this.monthCurrent = value;
    this.loadChart3(this.idBranch, this.monthCurrent, this.yearCurrent, true);
  }

  changeYear(value) {
    this.yearCurrent = value;
    this.loadChart2(this.idBranch, this.yearCurrent, true);
    this.loadChart3(this.idBranch, this.monthCurrent, this.yearCurrent, true);
  }

  loadChart1(idBranch, force: boolean) {
    this.subscriptionSalesReportPerHour = this.reportService.getInvoicesPerHour(idBranch, force).subscribe(
      res => {
        this.rendererChar1(res.body);
      }
    );
  }

  loadChart2(idBranch, year, force: boolean) {
    this.subscriptionMonthSaleReport = this.reportService.getOrdersPerMonth(idBranch, year, force).subscribe(
      res => {
        this.rendererChart2(res.body);
      }
    );
  }

  loadChart3(idBranch, month, year, force: boolean) {
    this.subscriptionReportDailySale = this.reportService.getOrdersPerMonthAndYear(idBranch, month, year, force).subscribe(
      res => {
        this.invoicesPerMaY = res.body;
        this.rendererChart3(month, year, res.body);
      }
    );
  }

  rendererChar1(items) {
    this.invoicesPerHour = items;
    if (this.invoicesPerHour !== undefined && Object.keys(this.invoicesPerHour).length > 0) {
      this.cantidad1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < Object.keys(this.invoicesPerHour).length; i++) {
        const hora = this.invoicesPerHour[i][1];
        this.cantidad1[hora] = this.invoicesPerHour[i][0];
      }
    } else {
      this.cantidad1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(
      () => {
        const chartDiv = document.getElementById('chart1');

        const data = new google.visualization.DataTable();
        data.addColumn('string', 'hora');
        data.addColumn('number', 'Ventas');
        data.addRows([
          ['0 AM', this.cantidad1[0]],
          ['1 AM', this.cantidad1[1]],
          ['2 AM', this.cantidad1[2]],
          ['3 AM', this.cantidad1[3]],
          ['4 AM', this.cantidad1[4]],
          ['5 AM', this.cantidad1[5]],
          ['6 AM', this.cantidad1[6]],
          ['7 AM', this.cantidad1[7]],
          ['8 AM', this.cantidad1[8]],
          ['9 AM', this.cantidad1[9]],
          ['10 AM', this.cantidad1[10]],
          ['11 AM', this.cantidad1[11]],
          ['12 PM', this.cantidad1[12]],
          ['1 PM', this.cantidad1[13]],
          ['2 PM', this.cantidad1[14]],
          ['3 PM', this.cantidad1[15]],
          ['4 PM', this.cantidad1[16]],
          ['5 PM', this.cantidad1[17]],
          ['6 PM', this.cantidad1[18]],
          ['7 PM', this.cantidad1[19]],
          ['8 PM', this.cantidad1[20]],
          ['9 PM', this.cantidad1[21]],
          ['10 PM', this.cantidad1[22]],
          ['11 PM', this.cantidad1[23]],
          ['12 PM', this.cantidad1[24]]
        ]);
        const options = {
          vAxis: {
            gridlines: {
              count: -1
            },
            viewWindow: {
              min: 0,
            },
            format: '#'
          },
          height: '200',
          lineWidth: 4,
          colors: ['#03A9F4'],
          curveType: 'function'
        };
        const classicChart = new google.visualization.AreaChart(chartDiv);
        classicChart.draw(data, options);
      }
    );
  }

  rendererChart2(items) {
    this.invoices = items;
    if (this.invoices !== undefined && Object.keys(this.invoices).length > 0) {
      this.cantidad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < Object.keys(this.invoices).length; i++) {
        const mes = this.invoices[i][1];
        this.cantidad[mes - 1] = this.invoices[i][0];
      }
    } else {
      this.cantidad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(
      () => {
        const chartDiv = document.getElementById('chart2');
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Mes');
        data.addColumn('number', 'Ventas');
        data.addRows([
          ['Enero', this.cantidad[0]],
          ['Febrero', this.cantidad[1]],
          ['Marzo', this.cantidad[2]],
          ['Abril', this.cantidad[3]],
          ['Mayo', this.cantidad[4]],
          ['Junio', this.cantidad[5]],
          ['Julio', this.cantidad[6]],
          ['Agosto', this.cantidad[7]],
          ['Septiembre', this.cantidad[8]],
          ['Octubre', this.cantidad[9]],
          ['Noviembre', this.cantidad[10]],
          ['Diciembre', this.cantidad[11]]
        ]);
        const options = {
          vAxis: {
            gridlines: {
              count: -1
            },
            viewWindow: {
              min: 0
            },
            format: '#'
          },
          colors: ['#F9A825']
        };
        const classicChart = new google.visualization.ColumnChart(chartDiv);
        classicChart.draw(data, options);
      }
    );
  }

  rendererChart3(month, year, items) {
    this.invoicesPerMaY = items;
    if (this.invoicesPerMaY !== undefined && Object.keys(this.invoicesPerMaY).length > 0) {
      this.cantidad3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < Object.keys(this.invoicesPerMaY).length; i++) {
        const dia = this.invoicesPerMaY[i][1];
        this.cantidad3[dia - 1] = this.invoicesPerMaY[i][0];
      }
    } else {
      this.cantidad3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(
      () => {
        const chartDiv = document.getElementById('chart3');

        const data = new google.visualization.DataTable();
        data.addColumn('string', 'dia');
        data.addColumn('number', 'Ventas');

        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          data.addRows([
            ['1', this.cantidad3[0]],
            ['2', this.cantidad3[1]],
            ['3', this.cantidad3[2]],
            ['4', this.cantidad3[3]],
            ['5', this.cantidad3[4]],
            ['6', this.cantidad3[5]],
            ['7', this.cantidad3[6]],
            ['8', this.cantidad3[7]],
            ['9', this.cantidad3[8]],
            ['10', this.cantidad3[9]],
            ['11', this.cantidad3[10]],
            ['12', this.cantidad3[11]],
            ['13', this.cantidad3[12]],
            ['14', this.cantidad3[13]],
            ['15', this.cantidad3[14]],
            ['16', this.cantidad3[15]],
            ['17', this.cantidad3[16]],
            ['18', this.cantidad3[17]],
            ['19', this.cantidad3[18]],
            ['20', this.cantidad3[19]],
            ['21', this.cantidad3[20]],
            ['22', this.cantidad3[21]],
            ['23', this.cantidad3[22]],
            ['24', this.cantidad3[23]],
            ['25', this.cantidad3[24]],
            ['26', this.cantidad3[25]],
            ['27', this.cantidad3[26]],
            ['28', this.cantidad3[27]],
            ['29', this.cantidad3[28]],
            ['30', this.cantidad3[29]],
            ['31', this.cantidad3[30]]
          ]);
        } else {
          if (month === 4 || month === 6 || month === 9 || month === 11) {
            data.addRows([
              ['1', this.cantidad3[0]],
              ['2', this.cantidad3[1]],
              ['3', this.cantidad3[2]],
              ['4', this.cantidad3[3]],
              ['5', this.cantidad3[4]],
              ['6', this.cantidad3[5]],
              ['7', this.cantidad3[6]],
              ['8', this.cantidad3[7]],
              ['9', this.cantidad3[8]],
              ['10', this.cantidad3[9]],
              ['11', this.cantidad3[10]],
              ['12', this.cantidad3[11]],
              ['13', this.cantidad3[12]],
              ['14', this.cantidad3[13]],
              ['15', this.cantidad3[14]],
              ['16', this.cantidad3[15]],
              ['17', this.cantidad3[16]],
              ['18', this.cantidad3[17]],
              ['19', this.cantidad3[18]],
              ['20', this.cantidad3[19]],
              ['21', this.cantidad3[20]],
              ['22', this.cantidad3[21]],
              ['23', this.cantidad3[22]],
              ['24', this.cantidad3[23]],
              ['25', this.cantidad3[24]],
              ['26', this.cantidad3[25]],
              ['27', this.cantidad3[26]],
              ['28', this.cantidad3[27]],
              ['29', this.cantidad3[28]],
              ['30', this.cantidad3[29]]
            ]);
          } else {
            if ((year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) && month === 2) {
              data.addRows([
                ['1', this.cantidad3[0]],
                ['2', this.cantidad3[1]],
                ['3', this.cantidad3[2]],
                ['4', this.cantidad3[3]],
                ['5', this.cantidad3[4]],
                ['6', this.cantidad3[5]],
                ['7', this.cantidad3[6]],
                ['8', this.cantidad3[7]],
                ['9', this.cantidad3[8]],
                ['10', this.cantidad3[9]],
                ['11', this.cantidad3[10]],
                ['12', this.cantidad3[11]],
                ['13', this.cantidad3[12]],
                ['14', this.cantidad3[13]],
                ['15', this.cantidad3[14]],
                ['16', this.cantidad3[15]],
                ['17', this.cantidad3[16]],
                ['18', this.cantidad3[17]],
                ['19', this.cantidad3[18]],
                ['20', this.cantidad3[19]],
                ['21', this.cantidad3[20]],
                ['22', this.cantidad3[21]],
                ['23', this.cantidad3[22]],
                ['24', this.cantidad3[23]],
                ['25', this.cantidad3[24]],
                ['26', this.cantidad3[25]],
                ['27', this.cantidad3[26]],
                ['28', this.cantidad3[27]],
                ['29', this.cantidad3[28]]
              ]);
            } else {
              data.addRows([
                ['1', this.cantidad3[0]],
                ['2', this.cantidad3[1]],
                ['3', this.cantidad3[2]],
                ['4', this.cantidad3[3]],
                ['5', this.cantidad3[4]],
                ['6', this.cantidad3[5]],
                ['7', this.cantidad3[6]],
                ['8', this.cantidad3[7]],
                ['9', this.cantidad3[8]],
                ['10', this.cantidad3[9]],
                ['11', this.cantidad3[10]],
                ['12', this.cantidad3[11]],
                ['13', this.cantidad3[12]],
                ['14', this.cantidad3[13]],
                ['15', this.cantidad3[14]],
                ['16', this.cantidad3[15]],
                ['17', this.cantidad3[16]],
                ['18', this.cantidad3[17]],
                ['19', this.cantidad3[18]],
                ['20', this.cantidad3[19]],
                ['21', this.cantidad3[20]],
                ['22', this.cantidad3[21]],
                ['23', this.cantidad3[22]],
                ['24', this.cantidad3[23]],
                ['25', this.cantidad3[24]],
                ['26', this.cantidad3[25]],
                ['27', this.cantidad3[26]],
                ['28', this.cantidad3[27]]
              ]);
            }
          }
        }
        const options = {
          vAxis: {
            gridlines: {
              count: -1
            },
            viewWindow: {
              min: 0
            },
            format: '#'
          },
          colors: ['#26D03E']
        };
        const classicChart = new google.visualization.ColumnChart(chartDiv);
        classicChart.draw(data, options);
      }
    );
  }
}
