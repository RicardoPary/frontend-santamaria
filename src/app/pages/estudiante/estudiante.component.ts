import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EstudianteService} from '../../shared/services/estudiante.service';
import {PersonaService} from '../../shared/services/persona.service';
import {EstudianteFilter} from '../../shared/models/estudiante';
import {DocenteFilter} from '../../shared/models/docente';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../shared/components/alert/alert.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  @ViewChild('modalEstudiante') modalEstudiante: ElementRef;
  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;
  modal: NgbModalRef;
  estudiante: any;

  titleModal: any;
  textButton: any;

  subscriptionTable: Subscription = new Subscription();

  headersColumns: any = [
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
      name: 'matricula',
      displayName: 'Matricula',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'tipo',
      displayName: 'Tipo',
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
      name: 'paterno',
      displayName: 'Paterno',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'materno',
      displayName: 'Materno',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'genero',
      displayName: 'Genero',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'fechaNacimiento',
      displayName: 'Fecha de Nacimiento',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'nacionalidad',
      displayName: 'Nacionalidad',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'direccion',
      displayName: 'Direccion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: '',
      displayName: 'Acciones',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'actionsStudent'
    }
  ];

  constructor(private modalService: NgbModal,
              private estudianteService: EstudianteService,
              private personaService: PersonaService,
              private alertService: AlertService,
              private router: Router) {

    this.estudianteService.currentEstudianteFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
  }

  callService(estudianteFilter: EstudianteFilter) {
    this.subscriptionTable = this.estudianteService.getAllEstudiantes(estudianteFilter).subscribe(res => {
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  openModal(content, titleModal, textButton) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
    this.titleModal = titleModal;
    this.textButton = textButton;
    if (this.textButton === 'Crear') {
      this.estudiante = null;
    }
  }

  submitEstudiante(form) {
    const estudiante = {
      'id': this.estudiante ? this.estudiante.id : null,
      'ci': form.value.ci,
      'direccion': form.value.direccion,
      'fechaNacimiento': form.value.fechaNacimiento,
      'genero': form.value.genero,
      'materno': form.value.materno,
      'matricula': form.value.matricula,
      'nacionalidad': form.value.nacionalidad,
      'nombre': form.value.nombre,
      'paterno': form.value.paterno,
      'telefono': parseFloat(form.value.telefono),
      'tipo': form.value.tipo
    };
    if (this.textButton === 'Crear') {
      this.estudianteService.createEstudiante(estudiante)
        .pipe(finalize(() => {
          this.estudianteService.sendEstudianteFilter(new EstudianteFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'estudiante creado exitosamente.'})
        );
    } else if (this.textButton === 'Editar') {
      this.estudianteService.modifyEstudiante(estudiante)
        .pipe(finalize(() => {
          this.estudianteService.sendEstudianteFilter(new EstudianteFilter());
          this.modal.close();
        }))
        .subscribe(
          () => this.alertService.showSuccess({html: 'estudiante modificado exitosamente.'})
      );
    }
  }

  closeModal() {
    this.modal.close();
  }


  clickPagination(event: any) {
    const filter = this.estudianteService.getEstudianteFilter();
    filter.page = (event.newPage) - 1;
    this.estudianteService.sendEstudianteFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.estudianteService.getEstudianteFilter();
    filter.sort = [event.column + ',' + state];
    this.estudianteService.sendEstudianteFilter(filter);
  }

  clickButtonRow(event) {
    if (event.description === 'delete') {
      this.alertService.showWarningQuestion({html: 'esta seguro de eliminar al estudiante ?'}, isConfirm => {
        if (isConfirm.value) {
          console.log('true');
          this.estudianteService.deleteEstudiante(event.item.id)
            .pipe(finalize(() => this.estudianteService.sendEstudianteFilter(new EstudianteFilter())))
            .subscribe(
              res => this.alertService.showSuccess({html: 'estudiante eliminado exitosamente.'}),
              err => this.alertService.showError({html: 'ocurrio un error al eliminar el estudiante.'})
            );
        }
      });
    } else if (event.description === 'edit') {
      this.openModal(this.modalEstudiante, 'Editar Estudiante', 'Editar');
      this.estudiante = event.item;
    } else if (event.description === 'bulletin') {
      console.log('se hixo click');
      this.router.navigate(['estudiante/boletin', event.item.id]);
    }
  }
}
