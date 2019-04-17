import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {PatientService} from '../../../shared/services';
import {PatientFilter} from '../../../shared/models/patient.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {finalize} from 'rxjs/operators';

@Component({
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;

  filtersColumns: any;

  modalRef: NgbModalRef;

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
      name: '',
      displayName: 'Acciones',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'actions'
    },
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
      name: 'firstName',
      displayName: 'Nombres',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'lastName',
      displayName: 'Apellidos',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'ci',
      displayName: 'CI',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'address',
      displayName: 'Direccion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'phone',
      displayName: 'Telefono',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'birthdate',
      displayName: 'Fecha Nacimiento',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'birthdate',
      displayName: 'Edad',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'address',
      displayName: 'Responsable',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'gender',
      displayName: 'Sexo',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },

    {
      name: 'birthdate',
      displayName: 'Fecha Registro',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'date'
    }
  ];

  constructor(private modalService: NgbModal,
              private patientService: PatientService,
              private alertService: AlertService) {

    this.patientService.currentPatientFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(patientFilter: PatientFilter) {
    this.patientService.getAllPatients(patientFilter).subscribe(res => {
      this.totalData = parseFloat(res.headers.get('X-Total-Count'));
      this.data = res.body;
    });
  }

  clickPagination(event: any) {
    const filter = this.patientService.getPatientFilter();
    filter.page = (event.newPage) - 1;
    this.patientService.sendPatientFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.patientService.getPatientFilter();
    filter.sort = [event.column + ',' + state];
    this.patientService.sendPatientFilter(filter);
  }

  submit(form) {
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
    this.modalRef = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
    this.titleModal = titleModal;
    this.textButton = textButton;
    if (this.textButton === 'Crear') {
      this.actividadCivica = null;
    }
  }

  closeModal() {
    this.modalRef.close();
  }

  clickButtonRow(event) {
    if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'esta seguro de eliminar El registro del Paciente?'}, isConfirm => {
        if (isConfirm.value) {
          this.patientService.deletePatient(event.item.id)
            .pipe(finalize(() => this.patientService.sendPatientFilter(new PatientFilter())))
            .subscribe(
              res => this.alertService.showSuccess({html: 'Datos del Paciente Eliminada Exitosamente.'}),
              err => this.alertService.showError({html: 'ocurrio un error al eliminar los Datos del Paciente.'})
            );
        }
      });
    } else if (event.description === 'edit') {
      this.openModal(this.modal, 'Editar Los Datos del Pacientes', 'Editar');
      this.actividadCivica = event.item;
    }
  }
}
