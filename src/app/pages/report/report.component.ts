import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {StaffService} from '../../shared/services/staff.service';
import {ContractService} from '../../shared/services/contract.service';
import {DocenteFilter} from '../../shared/models/docente';
import {Subscription} from 'rxjs/index';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;

  subscriptionTable: Subscription = new Subscription();


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
              private docenteService: ContractService,
              private personaService: StaffService) {

    this.docenteService.currentDocenteFilter().subscribe(
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
    this.subscriptionTable = this.docenteService.getAllDocentes(docenteFilter).subscribe(res => {
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitEstudiante(form) {
    /*this.personaService.createPersona({
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
        this.docenteService.createDocente({
          'grado': form.value.grado,
          'idTrabajador': 0,
          'idPersona': res.body.id
        }).subscribe(
          res2 => {
            this.docenteService.sendDocenteFilter(new DocenteFilter());
            this.docenteService.sendDocenteFilter(new DocenteFilter());
            this.modal.close();
          }
        );


      }
    );*/


  }

  closeModal() {
    this.modal.close();
  }

  clickPagination(event: any) {
    const filter = this.docenteService.getDocenteFilter();
    filter.page = (event.newPage) - 1;
    this.docenteService.sendDocenteFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.docenteService.getDocenteFilter();
    filter.sort = [event.column + ',' + state];
    this.docenteService.sendDocenteFilter(filter);
  }

}
