import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs/index';
import {convertBlobToBase64} from '../../shared/utils/blob-to-base64-util';
import {LoaderService} from '../../shared/components/loader/loader.service';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-book-sale-detail',
  templateUrl: './invoice-detail-popup.component.html'
})
export class InvoiceDetailModalComponent implements OnInit, OnDestroy {

  invoiceB64: any;
  subscriptionInvoiceService: Subscription = new Subscription();

  constructor(public router: Router,
              public route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private loader: LoaderService) {
  }

  ngOnInit() {
    this.load(this.route.snapshot.params['id']);
  }

  ngOnDestroy() {
    this.subscriptionInvoiceService.unsubscribe();
  }

  load(id) {
    /*this.loader.show('Cargando...');
    this.subscriptionInvoiceService = this.invoiceService.getDownloadFileInvoiceById(id)
      .subscribe(
        resInvoice => {
          convertBlobToBase64(resInvoice.body)
            .pipe(finalize(() => this.loader.hide()))
            .subscribe(
              resConvert => {
                this.invoiceB64 = this.sanitizer.bypassSecurityTrustResourceUrl(resConvert);
              }
            );
        },
        err => err
      );*/
  }

  clear() {
    this.router.navigate(['/invoice']);
  }
}
