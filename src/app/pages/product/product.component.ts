import {Component, ElementRef, OnInit, ViewChild, DoCheck, OnDestroy} from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {Product, ProductFilter} from '../../shared/model/product';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {VulAlertService} from '../../shared/alert/vul-alert.service';
import {CategoryService} from '../../shared/service/category.service';
import {LocalStorageService} from 'ngx-webstorage';
import {BranchService} from '../../shared/service/branch.service';
import {Subscription} from 'rxjs/index';
import {finalize} from 'rxjs/internal/operators';

@Component({
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, DoCheck, OnDestroy {

  status = false;
  statusFilter = 'all';
  subscriptionTable: Subscription;
  subscriptionProductService: Subscription;
  nameValue: String;
  stockValue: number;
  salePriceValue: number;
  products: any = [];
  filtersColumns: any;
  totalProducts: number;
  pageSize: number;
  page: number;
  statusReset = false;
  @ViewChild('modalProductEdit') modalProductEdit: ElementRef;
  product: any;
  modalProduct: NgbModalRef;
  categories = [];

  idBranch: any;

  valueInventory: boolean;

  headersColumns: any = [
    {
      name: 'urlImage',
      displayName: 'Foto',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'image'
    },
    {
      name: 'name',
      displayName: 'Nombre',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'category',
      displayName: 'Categoría',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'object',
      index: 'name'
    },
    {
      name: 'inventory',
      displayName: 'Inventario',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'booleanInventory'
    },
    {
      name: 'stock',
      displayName: 'Stock',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'number'
    },
    {
      name: 'marke',
      displayName: 'Marca',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'salePrice',
      displayName: 'Precio Venta',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'purchasePrice',
      displayName: 'Precio Compra',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'wholesalePrice',
      displayName: 'Precio mayoreo',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'discount',
      displayName: 'Descuento',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'numberPorcent'
    },
    {
      name: '',
      displayName: 'Opciones',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'productActions'
    }
  ];

  constructor(private productService: ProductService,
              private modalService: NgbModal,
              private categoryService: CategoryService,
              private alertService: VulAlertService,
              private $localStorage: LocalStorageService,
              private branchService: BranchService) {

    this.subscriptionProductService = this.productService.currentProductFilter().subscribe(
      productFilter => {
        if (productFilter) {
          this.valueInventory = productFilter.product.inventory;
          this.filtersColumns = productFilter.product;
          this.pageSize = productFilter.size;
          this.page = productFilter.page;
          this.nameValue = productFilter.product.name;
          this.stockValue = productFilter.product.stock;
          this.salePriceValue = productFilter.product.salePrice;
          this.branchService.currentIdBranch().subscribe(
            idBranch => {
              if (idBranch) {
                this.idBranch = idBranch;
                productFilter.product.idBranch = idBranch;
                this.callService(productFilter);
              }
            }
          );
        }
      }
    );

    this.categoryService.getCategory().subscribe(res => this.categories = res.body);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionTable ? this.subscriptionTable.unsubscribe() : '';
    this.subscriptionProductService ? this.subscriptionProductService.unsubscribe() : '';
  }

  callService(productFilter: ProductFilter) {
    this.subscriptionTable = this.productService.getAllProductsByFilter(productFilter).subscribe(res => {
      this.totalProducts = parseFloat(res.headers.get('X-Total-Count'));
      this.products = res.body;
    });
  }

  clickEvent() {
    this.status = !this.status;
  }

  clickPagination(event: any) {
    const filter = this.productService.getProductFilter();
    filter.page = (event.newPage) - 1;
    this.productService.sendProductFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.productService.getProductFilter();
    filter.sort = [event.column + ',' + state];
    this.productService.sendProductFilter(filter);
  }

  clickButton(event) {
    if (event.description === 'editProduct') {
      this.product = event.item;
      this.modalProduct = this.modalService.open(this.modalProductEdit, {backdrop: 'static'});
    } else if (event.description === 'deleteProduct') {
      this.product = null;
      this.alertService.showWarningQuestion({html: 'Esta seguro de eliminar el producto?'}, () => {
        this.productService.deleteProduct(event.item.id).pipe(finalize(() => {
          this.alertService.showSuccess({html: 'producto eliminado exitosamente.'})
          this.productService.sendProductFilter(new ProductFilter);
        })).subscribe(
          res => res
          , err => this.alertService.showError({html: 'ocurrio un error al eliminar el producto.'})
        );
      });
    }
  }

  closeModal() {
    this.modalProduct.close();
  }

  modifyProduct(form) {
    let category: any = '';
    this.categories.map(item => item.id === parseFloat(form.value.category) ? category = item : '');
    this.productService.modifyProduct({
      'barcode': form.value.barcode,
      'category': category,
      'description': form.value.description,
      'discount': form.value.discount,
      'idBranch': this.branchService.getIdBranch(),
      'id': this.product.id,
      'imageCache': this.product.imageCache,
      'imageName': this.product.imageName,
      'inventory': form.value.inventory,
      'marke': form.value.marke,
      'name': form.value.name,
      'purchasePrice': form.value.purchase_price,
      'salePrice': form.value.sale_price,
      'stock': this.product.stock,
      'type': form.value.type,
      'urlImage': this.product.urlImage,
      'wholesalePrice': form.value.wholesale_price
    }).pipe(finalize(() => {
      this.modalProduct.close();
      this.productService.sendProductFilter(new ProductFilter);
    })).subscribe(
      res => this.alertService.showSuccess({html: 'producto editado exitosamente.'})
      , err => this.alertService.showError({html: 'ocurrio un error al editar el producto.'})
    );
  }

  submitName(form) {
    const filter = this.productService.getProductFilter();
    filter.product.name = form.value.nameFilter;
    filter.page = 0;
    this.productService.sendProductFilter(filter);
    this.page = 0;
  }

  submitStock(form) {
    const filter = this.productService.getProductFilter();
    filter.product.stock = form.value.stockFilter;
    filter.page = 0;
    this.productService.sendProductFilter(filter);
    this.page = 0;
  }

  submitSalePrice(form) {
    const filter = this.productService.getProductFilter();
    filter.product.salePrice = form.value.salePriceFilter;
    filter.page = 0;
    this.productService.sendProductFilter(filter);
    this.page = 0;
  }

  reset() {
    this.productService.sendProductFilter(new ProductFilter());
    this.valueInventory = null;
  }

  ngDoCheck() {
    const newFilter = new Product();
    newFilter.idBranch = this.idBranch;
    this.statusReset = JSON.stringify(this.filtersColumns) === JSON.stringify(newFilter) ? false : true;
  }

  changeInventory(value) {
    const filter = this.productService.getProductFilter();
    if (value === 'sinStock') {
      filter.product.inventory = 'false';
    } else if (value === 'conStock') {
      filter.product.inventory = true;
    } else if (value === 'ambos') {
      filter.product.inventory = null;
    }
    filter.page = 0;
    this.productService.sendProductFilter(filter);
    this.page = 0;
  }
}
