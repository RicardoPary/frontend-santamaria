import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

import * as _ from 'underscore';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

  @Input() headers: any;
  @Input() data: any;
  @Input() pageSize: number;
  @Input() page: number;
  @Input() total: number;
  @Input() filtersColumns: any;
  @Input() minHeight: any = '250px';

  @Input() idUser: any;

  @Output() clickRow = new EventEmitter<any>();
  @Output() clickButton = new EventEmitter<any>();
  @Output() clickPagination = new EventEmitter<any>();
  @Output() clickSort = new EventEmitter<any>();
  @Output() clickSubmit = new EventEmitter<any>();

  listPerPage: number;
  internalHeaders: any;
  internalData: any;

  colFilterIndex = -1;
  column = '';
  isDesc = false;
  pager: any = {};
  pagedItems: any[] = [];

  constructor() {
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
    }

    if (changes !== undefined && changes.data !== undefined && changes.data.currentValue) {
      this.internalData = changes.data.currentValue;
      if (changes.data.currentValue instanceof Array) {
        this.pagedItems = changes.data.currentValue;
      }
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

  selectedRow(item: any, col: any, index: number, e: any) {
    this.clickRow.emit({item: item, col: col, i: index, event: e});
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

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 11) {
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
