import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DocenteFilter} from '../../shared/models/docente';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../shared/components/alert/alert.service';
import {ActividadCivicaFilter} from '../../shared/models/actividad-civica';

@Component({
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  @ViewChild('modalActividadCivica') modalActividadCivica: ElementRef;
  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;


  modal: NgbModalRef;
  titleModal: any;
  textButton: any;
  actividadCivica: any;

  headersColumns: any = [
    {
      name: 'cronograma',
      displayName: 'Cronograma',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
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
      name: 'fecha',
      displayName: 'Fecha',
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
              private actividadCivicaService: ActividadCivicaService,
              private alertService: AlertService) {

    this.actividadCivicaService.currentActividadCivicaFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(docenteFilter: DocenteFilter) {
    this.actividadCivicaService.getAllActividadesCivicas(docenteFilter).subscribe(res => {
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  submitEstudiante(form) {
    const actividadCivica = {
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
    }
  }

  clickPagination(event: any) {
    const filter = this.actividadCivicaService.getActividadCivicaFilter();
    filter.page = (event.newPage) - 1;
    this.actividadCivicaService.sendActividadCivicaFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.actividadCivicaService.getActividadCivicaFilter();
    filter.sort = [event.column + ',' + state];
    this.actividadCivicaService.sendActividadCivicaFilter(filter);
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
    if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'esta seguro de eliminar la actividad civica ?'}, isConfirm => {
        if (isConfirm.value) {
          console.log('true');
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
    }
  }
}
