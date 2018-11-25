import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {MateriaService} from '../../shared/services/materia.service';
import {AlertService} from '../../shared/components/alert/alert.service';
import {BimestreService} from '../../shared/services/bimestre.service';
import {CursoService} from '../../shared/services/curso.service';
import {BimestreFilter} from '../../shared/models/bimestre';
import {ActivatedRoute} from '@angular/router';
import {MateriaFilter} from '../../shared/models/materia';

@Component({
  selector: 'app-boletin',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

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
  boletin = [];

  constructor(private bimestreService: BimestreService,
              private cursoService: CursoService,
              private route: ActivatedRoute,
              private materiaService: MateriaService,
              private alertService: AlertService) {

    this.bimestreService.currentBimestreFilter().subscribe(
      dates => {
        dates.bimestre.idEstudiante = this.route.snapshot.params['idEstudiante'];
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



  }

  callService(bimestreFilter: BimestreFilter) {
    this.subscriptionBimestreService = this.bimestreService.getAllBimestresByFilter(bimestreFilter).subscribe(res => {
      const materiaFilter = new MateriaFilter();
      materiaFilter.page = null;
      materiaFilter.size = null;
      materiaFilter.sort = null;
      this.materiaService.getAllMaterias(materiaFilter).subscribe(
        resMateria => {
          resMateria.body.map(
            item => this.boletin.push({idMateria: item.id, promedioAnual: 0})
          );
          res.body.map(
            item => {
              this.boletin.map(
                itemBoletin => {
                  if (itemBoletin.idMateria === item.idMateria) {
                    itemBoletin[item.bimestre] = item.notaBimestralFinal;
                  }
                }
              );
            }
          );
        }
      );

      console.log('Boletin' , this.boletin);

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
