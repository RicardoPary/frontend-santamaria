import {Component, ElementRef, OnInit, ViewChild, DoCheck} from '@angular/core';
import {Invoice} from '../../shared/models/invoice';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConsultationService, SupplyService} from '../../shared/services/index';
import {ConsultationDetailsService} from '../../shared/services/index';

import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {LoaderService} from '../../shared/components/loader/loader.service';
import {ProductFilter} from '../../shared/models/product';
import {finalize} from 'rxjs/internal/operators';
import {AlertService} from '../../shared/components/alert/alert.service';
import {StaffService} from '../../shared/services/index';
import {SupplyFilter} from '../../shared/models/supply.model';

@Component({
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit, DoCheck {

  date = new Date();
  supplies = [];
  economicActivities: any;
  filterSupply = '';
  invoice: Invoice = new Invoice();
  modal: NgbModalRef;
  boxCurrent: any;
  statusBox: boolean;
  statusOpenSmart = false;
  selectedSupply = false;
  maskNumber: any;

  @ViewChild('modalBox') modalBox: ElementRef;

  constructor(private supplyService: SupplyService,
              private modalService: NgbModal,
              private clientService: ConsultationService,
              private consultationDetailsService: ConsultationDetailsService,
              private alertService: AlertService,
              private $localStorage: LocalStorageService,
              private router: Router,
              private loader: LoaderService,
              private route: ActivatedRoute) {



    /* this.maskNumber = createNumberMask({
       prefix: '',
       suffix: '',
       includeThousandsSeparator: false,
       allowDecimal: false,
     });
 */
  }

  ngOnInit() {

    /*this.consultationDetailsService.getAllByIdConsultation(this.route.snapshot.params.idConsultation).subscribe(
      res => {
        this.invoice = res.body;
        /!*this.registryDetails = res.body;*!/
        /!*this.modal = this.modalService.open(this.modalRegistryDetails, {backdrop: 'static', size: 'lg'});*!/
      }, () => this.alertService.showError({html: 'Ocurrio un error al mostrar el detalle de inventario.'})
    );*/


    /*this.krakenService.getAllEconomicActivitis().subscribe(res => {
      this.economicActivities = res.body;
      if (res.body.length > 0) {
        this.consultation.idEconomicActivity = res.body[0].id;
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
    });*/

    const supplyFilter = new SupplyFilter();
    this.supplyService.getAllSupplies(supplyFilter).subscribe(res => {
      this.supplies = res.body;
    });
  }

  ngDoCheck() {
    /* this.invoice.purchaseDetails.map(
       item => {
         item.subtotal = item.quantity * item.price;
       }
     );*/
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

  getSupplies(filter) {
    return this.supplies.filter((v) => {
      if (v.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 && filter.length > 2) {
        return true;
      }
      return false;
    });
  }

  selectSupply(product) {
    /*this.filterProduct = product.name;
    const purchaseDetail = new PurchaseDetails();
    purchaseDetail.idProduct = product.id;
    purchaseDetail.product = product;

    if (delibery) {
      purchaseDetail.statusTypeMethod = true;
    }

    this.invoice.purchaseDetails.push(purchaseDetail);
    this.statusOpenSmart = false;*/
  }

  deteleProduct(detail) {
    /*this.invoice.purchaseDetails = this.invoice.purchaseDetails.filter(item => item !== detail);*/
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  closeModal() {
    this.modal.close();
  }

  submitCloseBox(form) {
    /*this.boxService.updateBoxDTO({
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
    );*/
  }

  generateInvoice(invoice: Invoice, delibery: any) {
    /*this.loader.show('Cargando...');
    consultation.idBranch = this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId');
    this.consultation.delibery = delibery ? true : false;
    consultation.purchaseDetails.map(item => {
      item.typeMethod = item.statusTypeMethod ? 'LLevar' : 'Mesa';
      item.detail = item.product.name;
      item.price = item.product.salePrice;
      item.subtotal = (item.product.salePrice * item.quantity) - ((item.product.salePrice * item.quantity) * (item.discount / 100));
      item.inventory = item.product.inventory;
    });
    this.invoiceService.postInvoiceDTO(consultation)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe(
        res => {
          this.alertService.showSuccess({text: `facturado correctamente.`});
          this.consultation = new Invoice();
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
      );*/
  }

  getTotalAmount(invoice) {
    let total = 0;
    /*invoice.purchaseDetails.map(
      item => total = total + (item.product.salePrice * item.quantity) - ((item.product.salePrice * item.quantity) * (item.discount / 100))
    );
    invoice.totalAmount = total;*/
    return total;
  }

  submitBox(form) {
    /*this.boxService.createBoxDTO({
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
    this.modal.close();*/
  }

  checkDelibery(value) {
    /*if (value) {
      this.invoice.purchaseDetails.map(item => {
        item.statusTypeMethod = true;
      });
    }*/
  }
}
