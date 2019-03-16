import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../shared/components/alert/alert.service';
import {SupplyService} from '../../shared/services/index';
import {Subscription} from 'rxjs/internal/Subscription';
import {SupplyFilter} from '../../shared/models/supply.model';

@Component({
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss']
})
export class SupplyComponent implements OnInit {

  @ViewChild('modalActividadCivica') modalActividadCivica: ElementRef;
  filtersColumns: any;

  modal: NgbModalRef;
  titleModal: any;
  textButton: any;
  actividadCivica: any;

  subscriptionTable: Subscription;
  totalData: number;
  pageSize: number;
  page: number;
  data: any = [];

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
      name: 'type',
      displayName: 'Tipo',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'marke',
      displayName: 'Marca',
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
      name: 'inventory',
      displayName: 'Inventario',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'stock',
      displayName: 'Stock',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'salePrice',
      displayName: 'Precio de Venta',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'purchasePrice',
      displayName: 'Precio de Compra',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'wholesalePrice',
      displayName: 'Precio por Mayor',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'discount',
      displayName: 'Descuento',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'barcode',
      displayName: 'Codigo de Barra',
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
      type: 'actions'
    }
  ];

  constructor(private modalService: NgbModal,
              private supplyService: SupplyService,
              private alertService: AlertService) {

    this.supplyService.currentSupplyFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(supplyFilter: SupplyFilter) {
    this.supplyService.getAllSupplies(supplyFilter).subscribe(res => {
      this.totalData = parseFloat(res.headers.get('X-Total-Count'));
      this.data = res.body;
    });
  }

  clickPagination(event: any) {
    const filter = this.supplyService.getSupplyFilter();
    filter.page = (event.newPage) - 1;
    this.supplyService.sendSupplyFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.supplyService.getSupplyFilter();
    filter.sort = [event.column + ',' + state];
    this.supplyService.sendSupplyFilter(filter);
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
    if (this.textButton === 'Crear') {
      this.actividadCivica = null;
    }
  }

  closeModal() {
    this.modal.close();
  }

  clickButtonRow(event) {
    /*if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'esta seguro de eliminar la actividad civica ?'}, isConfirm => {
        if (isConfirm.value) {
          this.actividadCivicaService.deleteActividadCivica(event.item.id)
            .pipe(finalize(() => this.actividadCivicaService.sendActividadCivicaFilter(new ActividadCivicaFilter())))
            .subscribe(
              res => this.alertService.showSuccess({html: 'actividad civica eliminada exitosamente.'}),
              err => this.alertService.showError({html: 'ocurrio un error al eliminar el actividad civica.'})
            );
        }
      });
    } else if (event.description === 'edit') {
      this.openModal(this.modalActividadCivica, 'Editar Actividad Civica', 'Editar');
      this.actividadCivica = event.item;
    }*/
  }
}
