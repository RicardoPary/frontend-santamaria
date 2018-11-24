import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DocenteFilter} from '../../shared/models/docente';
import {ReunionService} from '../../shared/services/reunion.service';
import {ReunionFilter} from '../../shared/models/reunion';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../shared/components/alert/alert.service';
import {ActividadCivicaFilter} from '../../shared/models/actividad-civica';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.scss']
})
export class ReunionComponent implements OnInit {

  @ViewChild('modalReunion') modalReunion: ElementRef;
  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;

  modal: NgbModalRef;
  titleModal: any;
  textButton: any;
  reunion: any;

  headersColumns: any = [
    {
      name: 'descripcion',
      displayName: 'Descripcion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'detalle',
      displayName: 'Detalle',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'fecha',
      displayName: 'Fecha',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'hora',
      displayName: 'Hora',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'lugar',
      displayName: 'Lugar',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'nombre',
      displayName: 'Nombre',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'ordenDia',
      displayName: 'Orden del Dia',
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
              private reunionService: ReunionService,
              private alertService: AlertService) {

    this.reunionService.currentReunionFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(reunionFilter: ReunionFilter) {
    this.reunionService.getAllReuniones(reunionFilter).subscribe(res => {
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  openModal(content, titleModal, textButton) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
    this.titleModal = titleModal;
    this.textButton = textButton;
    if (this.textButton === 'Crear') {
      this.reunion = null;
    }
  }

  submitEstudiante(form) {
    const reunion = {
      'id': this.reunion ? this.reunion.id : null,
      'descripcion': form.value.descripcion,
      'detalle': form.value.detalle,
      'fecha': form.value.fecha,
      'hora': form.value.hora,
      'lugar': form.value.lugar,
      'nombre': form.value.nombre,
      'ordenDia': form.value.ordenDia
    };
    if (this.textButton === 'Crear') {
      this.reunionService.createReunion(reunion)
        .pipe(finalize(() => {
          this.reunionService.sendReunionFilter(new ReunionFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'reunion creada exitosamente.'})
        );
    } else if (this.textButton === 'Editar') {
      this.reunionService.modifyReunion(reunion)
        .pipe(finalize(() => {
          this.reunionService.sendReunionFilter(new ReunionFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'reunion modificada exitosamente.'})
        );
    }

  }

  closeModal() {
    this.modal.close();
  }

  clickPagination(event: any) {
    const filter = this.reunionService.getReunionFilter();
    filter.page = (event.newPage) - 1;
    this.reunionService.sendReunionFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.reunionService.getReunionFilter();
    filter.sort = [event.column + ',' + state];
    this.reunionService.sendReunionFilter(filter);
  }

  clickButtonRow(event) {
    if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'esta seguro de eliminar la reunion ?'}, isConfirm => {
        if (isConfirm.value) {
          this.reunionService.deleteReunion(event.item.id)
            .pipe(finalize(() => this.reunionService.sendReunionFilter(new ReunionFilter())))
            .subscribe(
              res => this.alertService.showSuccess({html: 'reunion eliminada exitosamente.'}),
              err => this.alertService.showError({html: 'ocurrio un error al eliminar la reunion.'})
            );
        }
      });
    } else if (event.description === 'edit') {
      this.openModal(this.modalReunion, 'Editar Reunion', 'Editar');
      this.reunion = event.item;
    }
  }
}
