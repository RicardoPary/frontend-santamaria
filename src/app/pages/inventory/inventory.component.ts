import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AulaService} from '../../shared/services/aula.service';
import {AulaFilter} from '../../shared/models/aula';

@Component({
  selector: 'app-aula',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  aulas: any = [];
  filtersColumns: any;
  totalAulas: number;
  pageSize: number;
  page: number;
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
      type: 'actionsView'
    }
  ];

  constructor(private modalService: NgbModal,
              private aulaService: AulaService) {

    this.aulaService.currentAulaFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
  }

  callService(aulaFilter: AulaFilter) {
    this.aulaService.getAllAulas(aulaFilter).subscribe(res => {
      this.totalAulas = parseFloat(res.headers.get('X-Total-Count'));
      this.aulas = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitEstudiante(form) {

  }

  closeModal() {
    this.modal.close();
  }

  clickPagination(event: any) {
    const filter = this.aulaService.getAulaFilter();
    filter.page = (event.newPage) - 1;
    this.aulaService.sendAulaFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.aulaService.getAulaFilter();
    filter.sort = [event.column + ',' + state];
    this.aulaService.sendAulaFilter(filter);
  }
}
