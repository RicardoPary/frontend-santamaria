import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PersonaService} from '../../shared/services/persona.service';
import {DocenteFilter} from '../../shared/models/docente';
import {PlantelAdministrativoService} from '../../shared/services/plantel-administrativo.service';

@Component({
  selector: 'app-plantel-administrativo',
  templateUrl: './plantel-administrativo.component.html',
  styleUrls: ['./plantel-administrativo.component.scss']
})
export class PlantelAdministrativoComponent implements OnInit {

  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;


  modal: NgbModalRef;

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
      type: 'actions'
    }
  ];

  constructor(private modalService: NgbModal,
              private plantelAdministrativoService: PlantelAdministrativoService,
              private personaService: PersonaService) {

    this.plantelAdministrativoService.currentPlantelAdministrativoFilter().subscribe(
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
    this.plantelAdministrativoService.getAllPlantelAdministrativos(docenteFilter).subscribe(res => {
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitEstudiante(form) {
    this.personaService.createPersona({
      'ci': form.value.ci,
      'nombre': form.value.nombre,
      'paterno': form.value.paterno,
      'materno': form.value.materno,
      'genero': form.value.genero,
      'fechaNacimiento': form.value.fechaNacimiento,
      'nacionalidad': form.value.nacionalidad,
      'direccion': form.value.direccion,
      'telefono': parseFloat(form.value.telefono)
    }).subscribe(
      res => {
        this.plantelAdministrativoService.createPlantelAdministrativo({
          'cargo': 'docente',
          'idTrabajador': 12,
          'idPersona': res.body.id
        }).subscribe(
          res2 => {
            this.plantelAdministrativoService.sendPlantelAdministrativoFilter(new DocenteFilter());
            this.plantelAdministrativoService.sendPlantelAdministrativoFilter(new DocenteFilter());
            this.modal.close();
          }
        );
      }
    );
  }

  closeModal() {
    this.modal.close();
  }

  clickPagination(event: any) {
    const filter = this.plantelAdministrativoService.getPlantelAdministrativoFilter();
    filter.page = (event.newPage) - 1;
    this.plantelAdministrativoService.sendPlantelAdministrativoFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.plantelAdministrativoService.getPlantelAdministrativoFilter();
    filter.sort = [event.column + ',' + state];
    this.plantelAdministrativoService.sendPlantelAdministrativoFilter(filter);
  }
}
