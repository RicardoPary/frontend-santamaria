import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MateriaService} from '../../shared/services/materia.service';
import {MateriaFilter} from '../../shared/models/materia';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {

  materias: any = [];
  filtersColumns: any;
  totalMaterias: number;
  pageSize: number;
  page: number;
  subscriptionTable: Subscription = new Subscription();
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
      name: 'sigla',
      displayName: 'Sigla',
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
      type: 'actions'
    }
  ];

  constructor(private modalService: NgbModal,
              private materiaService: MateriaService) {

    this.materiaService.currentMateriaFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(materiaFilter: MateriaFilter) {
    this.subscriptionTable = this.materiaService.getAllMaterias(materiaFilter).subscribe(res => {
      this.totalMaterias = parseFloat(res.headers.get('X-Total-Count'));
      this.materias = res.body;
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
    const filter = this.materiaService.getMateriaFilter();
    filter.page = (event.newPage) - 1;
    this.materiaService.sendMateriaFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.materiaService.getMateriaFilter();
    filter.sort = [event.column + ',' + state];
    this.materiaService.sendMateriaFilter(filter);
  }
}
