import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';

import {default as swal} from 'sweetalert2';
import {createNumberMask} from 'text-mask-addons/dist/textMaskAddons';
import {CompanyService} from '../../shared/service/company.service';
import {Company} from '../../shared/model/company.model';
import {UserBindService} from '../../shared/service/userBind.service';
import {User} from '../../shared/user/user.model';
import {CropperModalComponent} from '../../shared/components/modal-cropper.component';
import {CompanyBindService} from '../../shared/service/companyBind.service';
import {AccountService} from '../../shared/auth/account.service';
import {EconomicActivityService} from '../../shared/service/economicActivity.service';
import {BranchService} from '../../shared/service/branch.service';
import {ECONOMIC_ACTIVITY_ACTIVE, ECONOMIC_ACTIVITY_LOCK} from '../../shared/constant/sorter.constants';
import {HttpResponse} from '@angular/common/http';

@Component({
  templateUrl: './subsidiary.component.html'
})
export class SubsidiaryComponent implements OnInit {

  ECONOMIC_ACTIVITY_ACTIVE = ECONOMIC_ACTIVITY_ACTIVE;
  ECONOMIC_ACTIVITY_LOCK = ECONOMIC_ACTIVITY_LOCK;

  econAct: any;
  company: Company;
  user: User;
  modalEconAct: NgbModalRef;
  isEdit = false;
  EconActTemplate = {
    id: 0,
    description: '',
    characteristicCode: '',
    code: '',
    type: '',
    state: ''
  };
  errors = {
    codeEmpty: false,
    charCodeEmpty: false,
    typeEmpty: false,
    descriptionEmpty: false,
  };
  maskNumber: any;
  selectedEconAct = JSON.parse(JSON.stringify(this.EconActTemplate));

  constructor(private companyService: CompanyService,
              private branchService: BranchService,
              private companyBindService: CompanyBindService,
              private economicActivityService: EconomicActivityService,
              private userBindService: UserBindService,
              private modalService: NgbModal,
              private accountService: AccountService) {
    this.companyBindService.events$.forEach(event => {
      this.company = Object.assign({}, event.data);
      this.getAccount();
    });
    this.maskNumber = createNumberMask({
      prefix: '',
      suffix: '',
      includeThousandsSeparator: false,
      allowDecimal: false,
    });
  }

  ngOnInit() {
    this.getCompany();
    this.getBranches();
    this.loadEconomicActivities();
  }

  getCompany() {
    this.companyService.getCompany().subscribe(
      (res: HttpResponse<any>) => {
        this.onSuccess(res.body, res.headers);
      },
      (res: HttpResponse<any>) => this.onError(res.body)
    );
  }

  getBranches() {
  }

  save() {
    this.companyService.update(
      {
        address: this.company.legalAddress,
        contactEmail: this.company.emailEmergencyContact,
        contactName: this.company.nameEmergencyContact,
        name: this.company.name,
        phone: this.company.phoneEmergencyContact,
        webAddress: this.company.webAddress,
        emailRequired: this.company.emailRequired,
      }).subscribe(
      (res: HttpResponse<any>) => this.onSaveSuccess(res.body, res.headers),
      (res: HttpResponse<any>) => this.onError(res.body)
    );
  }

  private onSuccess(data, headers) {
    this.company = data;
  }

  private onError(error) {
  }

  private onSaveSuccess(data, headers) {
    this.company = data;
    swal({
      title: 'Guardado',
      text: 'Datos guardados exitosamente.',
      type: 'success',
      confirmButtonText: 'Aceptar',
      timer: 3000
    }).catch(swal.noop);
  }

  open() {
    const modalRef = this.modalService.open(CropperModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.urlImage = 'api/companies/update_image';
    modalRef.componentInstance.entity = 'company';
  }

  getAccount() {
    this.accountService.get().toPromise().then((account) => {
      if (account) {
        this.userBindService.sendMessage(account);
      }
    }).catch((err) => {
    });
  }

  launchUpload() {
    $('#uploadInput').trigger('click');
  }

  beforeTabChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-manage-econ-act') {
      this.loadEconomicActivities();
    }
  }

  loadEconomicActivities() {
    this.economicActivityService.getEconomicActivity().subscribe(
      (res: HttpResponse<any>) => this.econAct = res.body,
      (res: HttpResponse<any>) => res
    );
  }

  openModalEdit(content, econAct) {
    this.resetErrors();
    this.selectedEconAct.id = econAct.id;
    this.selectedEconAct.description = econAct.description;
    this.selectedEconAct.characteristicCode = econAct.characteristicCode;
    this.selectedEconAct.code = econAct.code;
    this.selectedEconAct.type = econAct.type;
    this.selectedEconAct.state = econAct.state;
    this.isEdit = true;
    this.modalEconAct = this.modalService.open(content, {backdrop: 'static'});
  }

  openModalCreate(content) {
    this.resetErrors();
    this.selectedEconAct = JSON.parse(JSON.stringify(this.EconActTemplate));
    this.isEdit = false;
    this.modalEconAct = this.modalService.open(content, {size: 'lg', backdrop: 'static'});
  }

  deleteEconAct(act) {
    swal({
      text: 'Está usted seguro de eliminar esta actividad económica: ' + act.description + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(() => {
      this.economicActivityService.deleteEconomicActivity(act.id).subscribe(
        (res) => {
          swal({
            title: 'Completado',
            text: '',
            type: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000
          }).catch(swal.noop);
          this.loadEconomicActivities();
        }, (res: any) => {
          this.onEconActError(res.headers);
        });
    }).catch(swal.noop);
  }

  lockEconAct(act) {
    swal({
      text: 'Está usted seguro de bloquear esta actividad económica: ' + act.description + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(() => {
      this.economicActivityService.lockEconomicActivity(act.id).subscribe(
        (res) => {
          swal({
            title: 'Completado',
            text: '',
            type: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000
          }).catch(swal.noop);
          this.loadEconomicActivities();
        });
    }).catch(swal.noop);
  }

  unlockEconAct(act) {
    swal({
      text: 'Está usted seguro de desbloquear esta actividad económica: ' + act.description + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(() => {
      this.economicActivityService.unlockEconomicActivity(act.id).subscribe(
        (res) => {
          swal({
            title: 'Completado',
            text: '',
            type: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000
          }).catch(swal.noop);
          this.loadEconomicActivities();
        });
    }).catch(swal.noop);
  }

  closeModal() {
    this.selectedEconAct = JSON.parse(JSON.stringify(this.EconActTemplate));
    this.isEdit = false;
    if (this.modalEconAct) this.modalEconAct.close();
  }

  validate() {
    this.resetErrors();
    let hasNoError = true;
    if (this.selectedEconAct.characteristicCode.toString().trim() === '') {
      this.errors.charCodeEmpty = true;
      hasNoError = false;
    }
    if (this.selectedEconAct.code === '' || this.selectedEconAct.code < 0) {
      this.errors.codeEmpty = true;
      hasNoError = false;
    }
    if (this.selectedEconAct.type.trim() === '') {
      this.errors.typeEmpty = true;
      hasNoError = false;
    }
    if (this.selectedEconAct.description.trim() === '') {
      this.errors.descriptionEmpty = true;
      hasNoError = false;
    }
    return hasNoError;
  }

  resetErrors() {
    this.errors.charCodeEmpty = false;
    this.errors.codeEmpty = false;
    this.errors.typeEmpty = false;
    this.errors.descriptionEmpty = false;
  }

  saveEconAct() {
    this.resetErrors();
    if (this.isEdit) {
      this.economicActivityService.updateEconomicActivity({
        id: this.selectedEconAct.id,
        type: this.selectedEconAct.type,
        description: this.selectedEconAct.description
      }).subscribe(
        (res: HttpResponse<any>) => {
          this.closeModal();
          swal({
            title: 'Actividad Económica Editada',
            text: '',
            type: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000
          }).catch(swal.noop);
          this.loadEconomicActivities();
        }, (res: any) => {
          this.onEconActError(res.headers);
        }
      );
    } else {
      this.economicActivityService.createEconomicActivity({
        code: this.selectedEconAct.code,
        characteristicCode: this.selectedEconAct.characteristicCode,
        type: this.selectedEconAct.type,
        state: this.selectedEconAct.state,
        description: this.selectedEconAct.description
      }).subscribe(
        (res: HttpResponse<any>) => {
          this.closeModal();
          swal({
            title: 'Actividad Económica Creada',
            text: '',
            type: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000
          }).catch(swal.noop);
          this.loadEconomicActivities();
        }, (res: any) => {
          this.onEconActError(res.headers);
        }
      );
    }
  }

  private onEconActError(headers) {
    const error = headers.get('x-krakenbackendapp-errorkey');
    let msg = '';
    if (error === 'invalidRequest') {
      msg = 'Credenciales no validas';
    } else if (error === 'exceedsLimit') {
      msg = 'Su cuenta no está habilitada para crear mas actividades económicas';
    } else if (error === 'economicActivityNotExists') {
      msg = 'La actividad económica no existe';
    } else if (error === 'internalError') {
      msg = 'Error desconocido. La actividad económica no pudo ser creada';
    } else if (error === 'cannotLock') {
      msg = 'Error desconocido. La actividad económica no pudo ser bloqueada';
    } else if (error === 'cannotUnlock') {
      msg = 'Error desconocido. La actividad económica no pudo ser desbloqueada';
    } else if (error === 'cannotDelete') {
      msg = 'La actividad económica no puede ser eliminada porque existen sucursales asociadas a ella.';
    } else {
      msg = 'Error desconocido. La tarea no se pudo completar';
    }
    swal({
      title: 'Error',
      text: msg,
      type: 'error',
      confirmButtonText: 'Aceptar',
    }).catch(swal.noop);
  }
}
