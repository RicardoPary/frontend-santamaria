import {Component, ElementRef, OnInit, ViewChild, DoCheck} from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {Invoice, PurchaseDetails} from '../../shared/model/invoice';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ClientService} from '../../shared/service/client.service';
import {PurchaseDetailsService} from '../../shared/service/purchase-details.service';
import {InvoiceService} from '../../shared/service/invoice.service';
import {VulAlertService} from '../../shared/alert/vul-alert.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {KrakenService} from '../../shared/service/kraken.service';
import {BoxService} from '../../shared/service/box.service';
import {VulLoaderService} from '../../shared/components/loader/vul-loader.service';
import {ProductFilter} from '../../shared/model/product';
import {finalize} from 'rxjs/internal/operators';
import {createNumberMask} from 'text-mask-addons/dist/textMaskAddons';
import {BranchService} from '../../shared/service/branch.service';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, DoCheck {

  date = new Date();
  products = [];
  economicActivities: any;
  filterProduct = '';
  invoice: Invoice = new Invoice();
  modal: NgbModalRef;
  boxCurrent: any;
  statusBox: boolean;
  statusOpenSmart = false;
  selectedProduct = false;
  maskNumber: any;

  @ViewChild('modalBox') modalBox: ElementRef;

  constructor(private productService: ProductService,
              private modalService: NgbModal,
              private clientService: ClientService,
              private invoiceService: InvoiceService,
              private purchaseDetailsService: PurchaseDetailsService,
              private alertService: VulAlertService,
              private $localStorage: LocalStorageService,
              private krakenService: KrakenService,
              private boxService: BoxService,
              private router: Router,
              private loader: VulLoaderService,
              private branchService: BranchService) {

    this.maskNumber = createNumberMask({
      prefix: '',
      suffix: '',
      includeThousandsSeparator: false,
      allowDecimal: false,
    });

  }

  ngOnInit() {

    this.krakenService.getAllEconomicActivitis().subscribe(res => {
      this.economicActivities = res.body;
      if (res.body.length > 0) {
        this.invoice.idEconomicActivity = res.body[0].id;
      }
    });
    this.boxService.getBoxDTO().subscribe(
      res => {
        if (res.body) {
          this.boxCurrent = res.body;
          this.statusBox = true;
        }
      },
      err => this.openModal(this.modalBox)
    );

    const productFilter = new ProductFilter();
    productFilter.product.idBranch = this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId');
    this.productService.getAllProductsByFilter(productFilter).subscribe(res => {
      this.products = res.body;
    });
  }

  ngDoCheck() {
    this.invoice.purchaseDetails.map(
      item => {
        item.subtotal = item.quantity * item.price;
      }
    );
  }

  increaseQuantity(detail, stock) {
    if ((detail.quantity < stock && detail.product.inventory) || (!detail.product.inventory)) {
      detail.quantity = detail.quantity + 1;
    }
  }

  decreaseQuantity(detail) {
    if (detail.quantity > 0) {
      detail.quantity = detail.quantity - 1;
    }
  }

  getProducts(filter) {
    return this.products.filter((v) => {
      if (v.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 && filter.length > 2) {
        return true;
      }
      return false;
    });
  }

  selectProduct(product, delibery) {
    this.filterProduct = product.name;
    const purchaseDetail = new PurchaseDetails();
    purchaseDetail.idProduct = product.id;
    purchaseDetail.product = product;

    if (delibery) {
      purchaseDetail.statusTypeMethod = true;
    }

    this.invoice.purchaseDetails.push(purchaseDetail);
    this.statusOpenSmart = false;
  }

  deteleProduct(detail) {
    this.invoice.purchaseDetails = this.invoice.purchaseDetails.filter(item => item !== detail);
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  closeModal() {
    this.modal.close();
  }

  submitCloseBox(form) {
    this.boxService.updateBoxDTO({
      'idBranch': this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId'),
      'closingNote': form.value.closingNote,
      'lossAmount': form.value.lossAmount ? form.value.lossAmount : 0
    }).subscribe(
      res => {
        this.statusBox = false;
        this.boxCurrent = res.body;
        this.modal.close();
        this.alertService.showSuccess({text: `cierre de caja exitoso.`});
      },
      err => {
        this.modal.close();
        this.alertService.showError({html: 'ocurrio un error durante el cierre de caja.'});
      }
    );
  }

  generateInvoice(invoice: Invoice, delibery: any) {
    this.loader.show('Cargando...');
    invoice.idBranch = this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId');
    this.invoice.delibery = delibery ? true : false;
    invoice.purchaseDetails.map(item => {
      item.typeMethod = item.statusTypeMethod ? 'LLevar' : 'Mesa';
      item.detail = item.product.name;
      item.price = item.product.salePrice;
      item.subtotal = (item.product.salePrice * item.quantity) - ((item.product.salePrice * item.quantity) * (item.discount / 100));
      item.inventory = item.product.inventory;
    });
    this.invoiceService.postInvoiceDTO(invoice)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe(
        res => {
          this.alertService.showSuccess({text: `facturado correctamente.`});
          this.invoice = new Invoice();
          this.filterProduct = '';
          const productFilter = new ProductFilter();
          productFilter.product.idBranch = this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId');
          this.productService.getAllProductsByFilter(productFilter).subscribe(resProduct => {
            this.products = resProduct.body;
          });
        },
        err => {
          this.alertService.showError({html: 'error al crear la factura.'});
          this.modal.close();
        }
      );
  }

  getTotalAmount(invoice) {
    let total = 0;
    invoice.purchaseDetails.map(
      item => total = total + (item.product.salePrice * item.quantity) - ((item.product.salePrice * item.quantity) * (item.discount / 100))
    );
    invoice.totalAmount = total;
    return total;
  }

  submitBox(form) {
    this.boxService.createBoxDTO({
      'idBranch': this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId'),
      'type': form.value.type,
      'name': form.value.name,
      'openingAmount': form.value.openingAmount ? form.value.openingAmount : 0,
      'openingNote': form.value.openingNote
    }).subscribe(
      res => {
        this.statusBox = true;
        this.boxCurrent = res.body;
        this.modal.close();
        this.alertService.showSuccess({text: `apertura de caja exitosamente.`});
      },
      err => this.alertService.showError({html: 'ocurrio un error durante la apertura de caja.'})
    );
    this.modal.close();
  }

  checkDelibery(value) {
    if (value) {
      this.invoice.purchaseDetails.map(item => {
        item.statusTypeMethod = true;
      });
    }
  }
}
