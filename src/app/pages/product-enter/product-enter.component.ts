import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {CategoryService} from '../../shared/service/category.service';
import {VulAlertService} from '../../shared/alert/vul-alert.service';
import {InventoryService} from '../../shared/service/inventory.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ProviderService} from '../../shared/service/provider.service';
import {BranchService} from '../../shared/service/branch.service';

@Component({
  templateUrl: './product-enter.component.html',
  providers: [],
  styleUrls: ['./product-enter.component.scss'],
})
export class ProductEnterComponent implements OnInit, OnDestroy {

  categories = [];
  inventory = false;

  constructor(private productService: ProductService,
              private inventoryService: InventoryService,
              private categoryService: CategoryService,
              private alertService: VulAlertService,
              private providerService: ProviderService,
              private $localStorage: LocalStorageService,
              private branchService: BranchService) {

  }

  ngOnInit() {
    this.categoryService.getAllByIdBranch(this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId'))
      .subscribe(res => this.categories = res.body);
  }

  ngOnDestroy() {

  }

  submit(form) {
  const product = {
    'barcode': form.value.barcode,
    'description': form.value.description,
    'discount': form.value.discount,
    'idBranch': this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId'),
    'category': form.value.category,
    'imageCache': 'string',
    'imageName': 'string',
    'inventory': this.inventory,
    'marke': form.value.marke,
    'name': form.value.name,
    'purchasePrice': form.value.purchasePrice,
    'salePrice': form.value.salePrice,
    'stock': 0,
    'type': 'string',
    'urlImage': 'string',
    'wholesalePrice': form.value.wholesalePrice
  };
  this.productService.createProduct(product).subscribe(
    resProduct => {
      if (form.value.inventory === 'si') {
        const inventory = {
          'company': 'string',
          'detail': 'string',
          'idProvider': null,
          'name': 'string',
          'phone': 'string',
          'price': 0,
          'product': resProduct.body,
          'quantity': 0,
          'type': 'string'
        };
        this.inventoryService.postInventory(inventory).subscribe(
          resInventory => this.alertService.showSuccess({html: 'producto creado exitosamente.'}),
          errInventory => this.alertService.showError({html: 'ocurrio un error al crear producto.'})
        );
      } else {
        this.alertService.showSuccess({html: 'producto creado exitosamente.'});
      }
    },
    errProduct => this.alertService.showError({html: 'ocurrio un error al crear producto.'}));
  }

  getCategoryById(categories, categoryId) {
    let category = new Object();
    categories.map(item => item.id === categoryId ? category = item : '');
    return category;
  }

  submitInventory(value) {
    this.inventory = value ? true : false;
  }
}
