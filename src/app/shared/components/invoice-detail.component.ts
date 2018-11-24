import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/index';
import { VulLoaderService } from './loader/vul-loader.service';
import {debounceTime} from 'rxjs/internal/operators';

@Component({
  templateUrl: 'invoice-detail.component.html'
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  rounteData: any;
  invoiceB64: any;
  x_data_req_page: string;

  private _success = new Subject<string>();
  successMessage: string;
  typeAlert: string;
  email: string;
  idInvoice: number;
  modalMail: NgbModalRef;
  invoiceType = 'letter';
  cancellationReason = '';
  canceledInvoice = true;

  constructor(private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private modalService: NgbModal,
              private location: Location,
              private loader: VulLoaderService) {
  }

  ngOnInit(): void {
    this.rounteData = this.activatedRoute.params.subscribe((params) => {
      this.idInvoice = params['id'];
      this.load(this.idInvoice);
      this.x_data_req_page = params['x_data'];
    });
    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 10000).subscribe(() => this.successMessage = null);
  }

  load(id) {

  }

  ngOnDestroy(): void {
    this.rounteData.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  openModal(content) {
    this.modalMail = this.modalService.open(content, { backdrop: 'static' });
  }

  closeModal() {
    this.modalMail.close();
  }

  sendEmail() {

  }

  private onSendMailSuccess(data) {
    this.closeModal();
    this.typeAlert = 'success';
    this._success.next(`La factura ha sido enviada al email ${this.email}.`);
  }

  private onError(error) {
    this.closeModal();
    this.typeAlert = 'danger';
    this._success.next(`Ocurrió un error al enviar la factura al email ${this.email}.`);
  }

  changeInvoiceFormat() {
    if (this.invoiceType === 'letter') {
      this.invoiceType = 'simplified-roll';
    } else {
      this.invoiceType = 'letter';
    }
    this.load(this.idInvoice);
  }
}
