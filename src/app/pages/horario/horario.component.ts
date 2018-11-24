import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HorarioService} from '../../shared/services/horario.service';
import {HorarioFilter} from '../../shared/models/horario';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {

  horarios: any = [];
  filtersColumns: any;
  totalHorarios: number;
  pageSize: number;
  page: number;
  subscriptionTable: Subscription = new Subscription();
  modal: NgbModalRef;

  headersColumns: any = [
    {
      name: 'dia',
      displayName: 'Dia',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'horaInicio',
      displayName: 'Hora Inicio',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'horaFin',
      displayName: 'Hora Fin',
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
              private horarioService: HorarioService) {

    this.horarioService.currentHorarioFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(horarioFilter: HorarioFilter) {
    this.subscriptionTable = this.horarioService.getAllHorarios(horarioFilter).subscribe(res => {
      this.totalHorarios = parseFloat(res.headers.get('X-Total-Count'));
      this.horarios = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitMateria(form) {
  }

  closeModal() {
    this.modal.close();
  }

  clickPagination(event: any) {
    const filter = this.horarioService.getHorarioFilter();
    filter.page = (event.newPage) - 1;
    this.horarioService.sendHorarioFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.horarioService.getHorarioFilter();
    filter.sort = [event.column + ',' + state];
    this.horarioService.sendHorarioFilter(filter);
  }
}
