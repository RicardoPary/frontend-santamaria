import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  NgZone, OnInit, DoCheck, ViewChild, ElementRef
} from '@angular/core';

import * as _ from 'underscore';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit, DoCheck {

  @Input() selectedRow = 0;

  queueType = 'assigned';
  internalNeedActionBox = false;
  rowExpandIndex = -1;

  @Input() headers: any;
  @Input() data: any;
  @Input() pageSize: number;
  @Input() page: number;
  @Input() total: number;
  @Input() filtersColumns: any;
  @Input() minHeight: any = '450px';
  @Input() viewPagesDates = true;

  @Output() clickRow = new EventEmitter<any>();
  @Output() clickButton = new EventEmitter<any>();
  @Output() clickPagination = new EventEmitter<any>();
  @Output() clickSort = new EventEmitter<any>();
  @Output() clickSubmit = new EventEmitter<any>();

  @Output() CheckboxChange = new EventEmitter<any>();
  @Input() showReviewerMapping: boolean;
  InternalShowReviewerMapping: boolean;

  listPerPage: number;
  internalHeaders = [];
  internalData = [];

  colFilterIndex = -1;
  column = '';
  isDesc = false;
  pager: any = {};
  pagedItems: any[] = [];
  @ViewChild('table') table: ElementRef;

  listCheck: any[] = [];

  constructor(private ngZone: NgZone) {

    window.onresize = (e) => {
      this.ngZone.run(() => {
        if (this.table.nativeElement.scrollWidth > this.table.nativeElement.clientWidth) {
          for (let i = this.internalHeaders.length - 1; i >= 0; i--) {
            if (this.internalHeaders[i].responsive === false || this.internalHeaders[i].responsive === null) {
              this.internalHeaders[i].responsive = true;
              this.internalHeaders[i].responsiveSize = this.table.nativeElement.scrollWidth;
              break;
            }
          }
        } else {
          this.internalHeaders.map(item => item.responsiveSize < this.table.nativeElement.clientWidth ? item.responsive = false : '');
        }
      });
    };

  }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.table.nativeElement.scrollWidth > this.table.nativeElement.clientWidth) {
      for (let i = this.internalHeaders.length - 1; i >= 0; i--) {
        if (this.internalHeaders[i].responsive === false || this.internalHeaders[i].responsive === null) {
          this.internalHeaders[i].responsive = true;
          this.internalHeaders[i].responsiveSize = this.table.nativeElement.scrollWidth;
          break;
        }
      }
    } else {
      this.internalHeaders.map(item => item.responsiveSize < this.table.nativeElement.clientWidth ? item.responsive = false : '');
    }
  }

  ngOnChanges(changes: any): void {

    if (changes !== undefined && changes.filtersColumns !== undefined && changes.filtersColumns.currentValue && this.internalHeaders) {
      this.internalHeaders.map(item => item.value = this.filtersColumns[item.name]);
      this.internalHeaders.map(item => item.statusFilter = item.value !== '' ? true : false);
    }

    if (changes !== undefined && changes.page !== undefined) {
      this.pager = this.getPager(this.total, this.page + 1, this.listPerPage);
    }

    if (changes !== undefined && changes.headers !== undefined && changes.headers.currentValue) {
      this.internalHeaders = changes.headers.currentValue;
      if (this.filtersColumns) {
        this.internalHeaders.map(item => item.value = this.filtersColumns[item.name]);
        this.internalHeaders.map(item => item.statusFilter = item.value !== '' ? true : false);
      }
      this.internalHeaders.map(item => item.responsive = null);
      this.internalHeaders.map(item => item.responsiveSize = null);
    }

    if (changes !== undefined && changes.data !== undefined && changes.data.currentValue) {
      this.selectedRow = 0;
      this.internalData = changes.data.currentValue;
      if (changes.data.currentValue instanceof Array) {
        this.pagedItems = changes.data.currentValue;
      }
      this.internalData.map(
        item => JSON.stringify(this.listCheck).indexOf(JSON.stringify(item)) !== -1 ? item.isChecked = true : ''
      );
    }

    if (changes !== undefined && changes.pageSize !== undefined && changes.pageSize.currentValue) {
      this.listPerPage = changes.pageSize.currentValue;
      this.pager = this.getPager(this.total, 1, changes.pageSize.currentValue);
    }

    if (this.pager.totalItems <= 0) {
      const currentPage = this.pager.currentPage;
      this.pager = this.getPager(this.total, currentPage, this.listPerPage);
      if (this.pager.totalItems > 0) {
        this.pager.currentPage = 1;
      }
    }

    const page = this.pager.currentPage = this.page + 1;
    this.pager = this.getPager(this.total, page, this.listPerPage);


    if (changes !== undefined && changes.showReviewerMapping !== undefined) {
      this.InternalShowReviewerMapping = changes.showReviewerMapping.currentValue;
    }
  }

  updateSort(item: any) {
    this.isDesc = !this.isDesc;
    this.column = item.name;
    this.clickSort.emit({
      isDesc: this.isDesc,
      column: this.column
    });
  }

  closeFilter() {
    this.colFilterIndex = -1;
  }

  selectRow(item: any, index: number, e: any) {
    this.selectedRow = index;
    this.clickRow.emit({item: item, i: index, event: e});
  }

  clickButtonRow(item, col, i, event, description) {
    this.clickButton.emit({item: item, col: col, i: i, event: event, description: description});
  }

  updatePagination(page: number) {
    this.colFilterIndex = -1;
    this.pager = this.getPager(this.total, page, this.listPerPage);
    this.clickPagination.emit({
      newPage: page
    });
  }

  clickFilterIcon(i) {
    this.colFilterIndex = this.colFilterIndex === i ? -1 : i;
  }

  submitFilter(event) {
    this.internalHeaders.map(item => {
      if (item.name === event.name) {
        this.filtersColumns[event.name] = event.value;
        item.value = event.value;
        item.statusFilter = event.value !== '' ? true : false;
      }
    });
    this.clickSubmit.emit(this.filtersColumns);
    this.updatePagination(1);
  }

  ShowExpand(index: number) {
    this.rowExpandIndex = index;
    /*this.showActionBox = false;

    this.plusExpande.emit({rowExpanded: true});*/
  }

  ShowExpandMinus() {
    this.rowExpandIndex = -1;
    /*this.showActionBox = false;

    this.plusExpande.emit({rowExpanded: false});*/
  }

  verifyResponsive() {
    let status = false;
    this.internalHeaders.map(item => item.responsive ? status = true : '');
    return status;
  }

  AssignCasesToCart(e: any, item: any) {

    if (e.target.checked) {
      (this.listCheck.indexOf(item) === -1) ? this.listCheck.push(item) : '';
    } else {
      delete item.isChecked;
      for (let i = 0; i < this.listCheck.length; i++) {
        if (JSON.stringify(this.listCheck[i]) === JSON.stringify(item)) {
          this.listCheck.splice(i, 1);
        }
      }
    }

    this.CheckboxChange.emit(this.listCheck);
  }

  getPager(totalItems: number = 10, currentPage: number = 1, pageSize: number = 7) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {

      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = _.range(startPage, endPage + 1);
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

}
