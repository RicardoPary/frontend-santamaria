import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';
import {DocenteFilter} from '../../shared/models/docente';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CursoService} from '../../shared/services/curso.service';
import {Router} from '@angular/router';
import {CursoFilter} from '../../shared/models/curso';

@Component({
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;

  @ViewChild('modalHorario') modalHorario: ElementRef;


  modal: NgbModalRef;

  headersColumns: any = [
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
      name: 'tipo',
      displayName: 'Tipo',
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
      name: '',
      displayName: 'Acciones',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'actionsInscripcion'
    }
  ];

  constructor(private modalService: NgbModal,
              private actividadCivicaService: ActividadCivicaService,
              private cursoService: CursoService,
              private router: Router) {

    this.cursoService.currentCursoFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
  }

  callService(cursoFilter: CursoFilter) {
    this.cursoService.getAllCursos(cursoFilter).subscribe(res => {
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitEstudiante(form) {
    this.actividadCivicaService.modifyActividadCivica({
      'cronograma': form.value.cronograma,
      'descripcion': form.value.descripcion,
      'fecha': form.value.fecha,
      'nombre': form.value.nombre
    }).subscribe(
      res => {
        this.actividadCivicaService.sendActividadCivicaFilter(new DocenteFilter());
        this.actividadCivicaService.sendActividadCivicaFilter(new DocenteFilter());
        this.modal.close();
      }
    );
  }

  closeModal() {
    this.modal.close();
  }

  clickButtonRow(event) {
    if (event.description === 'view') {
      this.router.navigate(['/supply', event.item.id, 2]);
    } else if (event.description === 'horario') {
      this.openModal(this.modalHorario);
    }

  }

  clickPagination(event: any) {
    const filter = this.cursoService.getCursoFilter();
    filter.page = (event.newPage) - 1;
    this.cursoService.sendCursoFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.cursoService.getCursoFilter();
    filter.sort = [event.column + ',' + state];
    this.cursoService.sendCursoFilter(filter);
  }

}
