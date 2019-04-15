import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../shared/components/alert/alert.service';
import {InventoryService, ProviderService} from '../../shared/services/index';
import {Subscription} from 'rxjs/internal/Subscription';
import {ProviderFilter} from '../../shared/models/provider';
import {finalize} from 'rxjs/operators';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  @ViewChild('modalActividadCivica') modalActividadCivica: ElementRef;
  filtersColumns: any;
  registryDetails: any = [];


  modal: NgbModalRef;
  titleModal: any;
  textButton: any;
  actividadCivica: any;

  subscriptionTable: Subscription;
  totalData: number;
  pageSize: number;
  page: number;
  data: any = [];

  @ViewChild('modalRegistryDetails') modalRegistryDetails: ElementRef;

  headersColumns: any = [
    {
      name: 'id',
      displayName: 'Id',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'name',
      displayName: 'Nombre',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'description',
      displayName: 'Descripcion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'company',
      displayName: 'Empresa',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'date',
      displayName: 'Fecha',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'observation',
      displayName: 'Observacion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'phone',
      displayName: 'Celular',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'type',
      displayName: 'Tipo',
      canSort: true,
      canFilter: true,
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
      type: 'actionsView'
    }
  ];

  constructor(private modalService: NgbModal,
              private providerService: ProviderService,
              private inventoryService: InventoryService,
              private alertService: AlertService) {

    this.providerService.currentProviderFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(providerFilter: ProviderFilter) {
    this.providerService.getAllProviders(providerFilter).subscribe(res => {
      this.totalData = parseFloat(res.headers.get('X-Total-Count'));
      this.data = res.body;
    });
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

  submitEstudiante(form) {
    /*const actividadCivica = {
      'id': this.actividadCivica ? this.actividadCivica.id : null,
      'cronograma': form.value.cronograma,
      'descripcion': form.value.descripcion,
      'fecha': form.value.fecha,
      'nombre': form.value.nombre
    };
    if (this.textButton === 'Crear') {
      this.actividadCivicaService.createActividadCivica(actividadCivica)
        .pipe(finalize(() => {
          this.actividadCivicaService.sendActividadCivicaFilter(new ActividadCivicaFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'actividad civica creada exitosamente.'})
        );
    } else if (this.textButton === 'Editar') {
      this.actividadCivicaService.modifyActividadCivica(actividadCivica)
        .pipe(finalize(() => {
          this.actividadCivicaService.sendActividadCivicaFilter(new ActividadCivicaFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'actividad civica modificada exitosamente.'})
        );
    }*/
  }

  openModal(content, titleModal, textButton) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
    this.titleModal = titleModal;
    this.textButton = textButton;
  }

  closeModal() {
    this.modal.close();
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

  saveInventories(inventoris) {
    /*this.registry.idBranch = this.branchService.getIdBranch();
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
    this.addInventory();*/
  }

}
