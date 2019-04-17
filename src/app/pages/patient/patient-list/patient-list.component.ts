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
  modalRef: NgbModalRef;

  titleModal: any;
  textButton: any;
  patient: any;

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
      name: 'gender',
      displayName: 'Genero',
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
      name: 'responsable',
      displayName: 'Responsable',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
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
    const patient = {
      'id': this.patient ? this.patient.id : null,
      'address': form.value.direccion,
      'birthdate': '1990-08-08',
      'ci': form.value.ci,
      'firstName': form.value.nombres,
      'gender': 'masculino',
      'lastName': form.value.apellidos,
      'phone': form.value.telefono,
      'responsable': form.value.responsable
    };
    if (this.textButton === 'Guardar') {
      this.patientService.createPatient(patient)
        .pipe(finalize(() => {
          this.patientService.sendPatientFilter(new PatientFilter());
          this.modalRef.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'paciente creado exitosamente.'})
        );
    }
    if (this.textButton === 'Editar') {
      this.patientService.modifyPatient(patient)
        .pipe(finalize(() => {
          this.patientService.sendPatientFilter(new PatientFilter());
          this.modalRef.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'paciente modificado exitosamente.'})
        );
    }
  }

  clickButtonRow(event) {
    if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'Esta seguro de eliminar el paciente ?'}, isConfirm => {
        if (isConfirm.value) {
          this.patientService.deletePatient(event.item.id)
            .pipe(finalize(() => this.patientService.sendPatientFilter(new PatientFilter())))
            .subscribe(
              () => this.alertService.showSuccess({html: 'Datos del Paciente eliminados exitosamente.'}),
              () => this.alertService.showError({html: 'Ocurrio un error al eliminar los datos del paciente.'})
            );
        }
      });
    } else if (event.description === 'edit') {
      this.openModal(this.modal, 'Editar los datos del paciente', 'Editar');
      this.patient = event.item;
    }
  }

  openModal(content, titleModal, textButton) {
    this.modalRef = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
    this.titleModal = titleModal;
    this.textButton = textButton;
    if (this.textButton === 'Guardar') {
      this.patient = null;
    }
  }

  closeModal() {
    this.modalRef.close();
  }
}
