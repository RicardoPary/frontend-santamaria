import {Component, OnInit} from '@angular/core';
import {BimestreService} from '../../shared/services/bimestre.service';
import {MateriaService} from '../../shared/services/materia.service';
import {CursoService} from '../../shared/services/curso.service';
import {ActivatedRoute} from '@angular/router';
import {Bimestre} from './bimestre';
import {BimestreFilter} from '../../shared/models/bimestre';
import {Subscription} from 'rxjs/internal/Subscription';
import {AlertService} from '../../shared/components/alert/alert.service';
import {MateriaFilter} from '../../shared/models/materia';

@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
  styleUrls: ['./bimestre.component.scss']
})
export class BimestreComponent implements OnInit {

  subscriptionBimestreService: Subscription = new Subscription();

  materias: any = [];

  bimestres: any = [];
  filtersColumns: any;
  totalBimestres: number;
  pageSize: number;
  page: number;

  bimestreValue: any;
  materiaValue: any;
  gestionValue: any;
  readonlyValue = true;

  constructor(private bimestreService: BimestreService,
              private cursoService: CursoService,
              private route: ActivatedRoute,
              private materiaService: MateriaService,
              private alertService: AlertService) {

    this.bimestreService.currentBimestreFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.bimestreValue = dates.bimestre.bimestre;
        this.materiaValue = dates.bimestre.idMateria;
        this.gestionValue = dates.bimestre.gestion;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {

    /*this.materiaService.getAllMateriasByIdCurso(this.route.snapshot.params['idCurso']).subscribe(
      res => this.materias = res.body
    );*/

    const materiaFilter = new MateriaFilter();
    materiaFilter.page = null;
    materiaFilter.size = null;
    materiaFilter.sort = null;

    this.materiaService.getAllMaterias(materiaFilter).subscribe(
      res => this.materias = res.body
    );

  }

  callService(bimestreFilter: BimestreFilter) {
    this.subscriptionBimestreService = this.bimestreService.getAllBimestresByFilter(bimestreFilter).subscribe(res => {
      console.log(res);
      this.totalBimestres = parseFloat(res.headers.get('X-Total-Count'));
      this.bimestres = res.body;
    });
  }

  submitBimestre(value) {
    console.log(value);
    const filter = this.bimestreService.getBimestreFilter();
    filter.bimestre.bimestre = value;
    filter.page = 0;
    this.bimestreService.sendBimestreFilter(filter);
    this.page = 0;
  }

  submitMateria(value) {
    console.log(value);
    const filter = this.bimestreService.getBimestreFilter();
    filter.bimestre.idMateria = value;
    filter.page = 0;
    this.bimestreService.sendBimestreFilter(filter);
    this.page = 0;
  }

  submitGestion(value) {
    console.log(value);
    const filter = this.bimestreService.getBimestreFilter();
    filter.bimestre.gestion = value;
    filter.page = 0;
    this.bimestreService.sendBimestreFilter(filter);
    this.page = 0;
  }

  saveBimestre() {
    this.bimestres.map(
      item => {
        item.serPromedio = this.getPromedio(item.notaSer1, item.notaSer2, item.notaSer3, item.notaSer4, item.notaSer5, item.notaSer6);
        item.saberPromedio = this.getPromedio(item.notaSaber1, item.notaSaber2, item.notaSaber3, item.notaSaber4, item.notaSaber5, item.notaSaber6);
        item.hacerPromedio = this.getPromedio(item.notaHacer1, item.notaHacer2, item.notaHacer3, item.notaHacer4, item.notaHacer5, item.notaHacer6);
        item.decirPromedio = this.getPromedio(item.notaDecir1, item.notaDecir2, item.notaDecir3, item.notaDecir4, item.notaDecir5, item.notaDecir6);

        this.bimestreService.modifyBimestre(item).subscribe(
          res => {
            this.alertService.showSuccess({html: 'se guardo exitosamente.'});
            console.log(res);
          }
        );
      }
    );
  }

  getPromedio(nota1, nota2, nota3, nota4, nota5, nota6) {
    return (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4) + parseFloat(nota5) + parseFloat(nota6)) / 6;
  }
}
