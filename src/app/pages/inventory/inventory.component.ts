import {Component, ElementRef, OnInit, ViewChild, OnDestroy, DoCheck} from '@angular/core';
import {VulAlertService} from '../../shared/alert/vul-alert.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Inventory, InventoryFilter} from '../../shared/model/inventory';
import {Provider, ProviderFilter} from '../../shared/model/provider';
import {InventoryService} from '../../shared/service/inventory.service';
import {ProductService} from '../../shared/service/product.service';
import {CategoryService} from '../../shared/service/category.service';
import {ProviderService} from '../../shared/service/provider.service';
import {LocalStorageService} from 'ngx-webstorage';
import {BranchService} from '../../shared/service/branch.service';
import {Subscription} from 'rxjs/index';
import {Product, ProductFilter} from '../../shared/model/product';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy, DoCheck {

  subscriptionTable: Subscription;
  subscriptionProviderService: Subscription;

  nameValue: String;
  companyValue: string;

  status = false;
  statusReset = false;
  idBranch: any;

  @ViewChild('modalRegistryDetails') modalRegistryDetails: ElementRef;
  modal: NgbModalRef;
  inventorisDetails: Inventory [] = [];
  products = [];
  registry = {
    company: '',
    description: '',
    observation: '',
    phone: '',
    type: '',
    idBranch: '',
    name: ''
  };

  providers: any = [];
  filtersColumns: any;
  totalProviders: number;
  pageSize: number;
  page: number;
  registryDetails: any = [];

  headersColumns: any = [
    {
      name: 'company',
      displayName: 'Compañía',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'name',
      displayName: 'Nombre proveedor',
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
      name: 'description',
      displayName: 'Descripción',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'observation',
      displayName: 'Observación',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'phone',
      displayName: 'Teléfono',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'type',
      displayName: 'Tipo',
      canSort: true,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: '',
      displayName: 'Acciones',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'actionsInventory'
    }
  ];

  constructor(private modalService: NgbModal,
              private alertService: VulAlertService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private providerService: ProviderService,
              private inventoryService: InventoryService,
              private $localStorage: LocalStorageService,
              private branchService: BranchService) {


    this.subscriptionProviderService = this.providerService.currentProviderFilter().subscribe(
      providerFilter => {
        this.pageSize = providerFilter.size;
        this.page = providerFilter.page;
        this.filtersColumns = providerFilter.provider;
        this.nameValue = providerFilter.provider.name;
        this.companyValue = providerFilter.provider.company;
        this.branchService.currentIdBranch().subscribe(
          idBranch => {
            if (idBranch) {
              this.idBranch = idBranch;
              const productFilter = new ProductFilter();
              productFilter.product.inventory = true;
              productFilter.product.idBranch = idBranch;
              this.productService.getAllProductsByFilter(productFilter).subscribe(res => this.products = res.body);
              providerFilter.provider.idBranch = idBranch;
              this.callService(providerFilter);
            }
          }
        );
      }
    );
  }

  ngOnInit() {
    this.addInventory();
  }

  ngOnDestroy() {
    this.subscriptionTable ? this.subscriptionTable.unsubscribe() : '';
    this.subscriptionProviderService ? this.subscriptionProviderService.unsubscribe() : '';
  }

  clickEvent() {
    this.status = !this.status;
  }

  callService(providerFilter: ProviderFilter) {
    this.subscriptionTable = this.providerService.getAllProvidersByFilter(providerFilter).subscribe(res => {
      this.totalProviders = parseFloat(res.headers.get('X-Total-Count'));
      this.providers = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  closeModal() {
    this.modal.close();
  }

  addInventory() {
    this.inventorisDetails.push(new Inventory);
  }

  removeInventory(inventory) {
    if (this.inventorisDetails.length > 1) {
      this.inventorisDetails = this.inventorisDetails.filter(item => item !== inventory);
      inventory.selected = true;
    }
    inventory.selected = true;
  }

  saveInventories(inventoris) {
    this.registry.idBranch = this.branchService.getIdBranch();
    this.providerService.createProvider(this.registry).subscribe(
      resProvider => {
        inventoris.map(item => item.idProvider = resProvider.body.id);
        inventoris.map(item => {
          this.inventoryService.postInventory(item).subscribe(
            resInventory => {
              item.product.stock = parseFloat(item.product.stock) + parseFloat(item.quantity);
              this.productService.modifyProduct(item.product).subscribe(
                resProduct => this.alertService.showSuccess({html: 'Inventario creado exitosamente.'})
              );
            },
            errInventory => this.alertService.showError({html: 'Ocurrio un error al crear inventario.'})
          );
        });
        this.providerService.sendProviderFilter(new ProviderFilter());
      }
    );
    this.closeModal();
    this.registry = {
      company: '',
      description: '',
      observation: '',
      phone: '',
      type: '',
      idBranch: '',
      name: ''
    };
    this.inventorisDetails = [];
    this.addInventory();
  }

  selectProduct(product, inventory) {
    this.inventorisDetails.map(item => item === inventory ? item.product = product : '');
    inventory.filterText = product.name;
    inventory.selected = false;
  }

  getProducts(filter) {
    if (this.products.length > 0) {
      return this.products.filter((v) => {
        if (v && filter !== '' && filter !== undefined && filter !== null) {
          if (v.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 && filter.length > 2) {
            return true;
          }
        }
        return false;
      });
    }
  }

  clickPagination(event: any) {
    const filter = this.providerService.getProviderFilter();
    filter.page = (event.newPage) - 1;
    this.providerService.sendProviderFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.providerService.getProviderFilter();
    filter.sort = [event.column + ',' + state];
    this.providerService.sendProviderFilter(filter);
  }

  clickButton(event) {
    if (event.description === 'view') {
      this.inventoryService.getAllByIdProvider(event.item.id).subscribe(
        res => {
          this.registryDetails = res.body;
          this.modal = this.modalService.open(this.modalRegistryDetails, {backdrop: 'static', size: 'lg'});
        }, () => this.alertService.showError({html: 'Ocurrio un error al mostrar el detalle de inventario.'})
      );
    } else if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'Esta seguro de eliminar el inventario?'}, () => {
        this.providerService.deleteProvider(event.item.id).pipe(finalize(() => {
          this.providerService.sendProviderFilter(new ProviderFilter);
        })).subscribe(
          () => this.alertService.showSuccess({html: 'inventario eliminado exitosamente.'}),
          () => this.alertService.showError({html: 'ocurrio un error al eliminar el producto.'})
        );
      });
    }
  }

  submitName(form) {
    const filter = this.providerService.getProviderFilter();
    filter.provider.name = form.value.nameFilter;
    filter.page = 0;
    this.providerService.sendProviderFilter(filter);
    this.page = 0;
  }

  submitCompany(form) {
    const filter = this.providerService.getProviderFilter();
    filter.provider.company = form.value.companyFilter;
    filter.page = 0;
    this.providerService.sendProviderFilter(filter);
    this.page = 0;
  }

  reset() {
    this.providerService.sendProviderFilter(new ProviderFilter());
  }

  ngDoCheck() {
    const newFilter = new Provider();
    newFilter.idBranch = this.idBranch;
    this.statusReset = JSON.stringify(this.filtersColumns) === JSON.stringify(newFilter) ? false : true;
  }

  verifyProductsSelected() {
    let status = true
    this.inventorisDetails.map(item => !item.product.id || item.detail === '' ? status = false : '');
    return status;
  }
}
