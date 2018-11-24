import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {FileUploader} from 'ng2-file-upload';

import {environment} from '../../../environments/environment';
import {UtilsService} from '../service/utils.service';
import {UserBindService} from '../service/userBind.service';
import {User} from '../user/user.model';
import {CompanyBindService} from '../service/companyBind.service';
import {VulLoaderService} from './loader/vul-loader.service';
import {VulAlertService} from '../alert/vul-alert.service';

@Component({
  selector: 'app-cropper-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{title | uppercase}}</h4>
    </div>
    <div class="modal-body">
      <div class="col-md-12 py-3 text-center">
        <input type="file" ng2FileSelect value="Select" [uploader]="uploader" [accept]="allowedMimeType.toString()">

        <img-cropper [hidden]="entity === 'company'"
                     #profileCropper
                     [image]="data"
                     [settings]="cropperSettings">

        </img-cropper>

        <img *ngIf="entity === 'company'"
             imgPreview
             [media]="uploader?.queue[(uploader?.queue?.length)-1]?._file"
             type="image"
             width="420"
             height="420">

      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss('Cross click')">Cancelar</button>
      <button type="button" class="btn btn-primary" (click)="getFileUploader()">Guardar</button>
    </div>
  `
})
export class CropperModalComponent implements OnInit {
  imageOrigin: any;
  @ViewChild('profileCropper') profileCropper: ImageCropperComponent;
  urlImage;
  title: any;
  URL: string = environment.endPoint;
  uploader: FileUploader;
  allowedMimeType = ['image/png', 'image/jpeg'];
  user: User;
  entity;

  image: any;
  data: any;
  cropperSettings: CropperSettings;
  sizeSquareUser = 210;
  sizeSquareCompany = 210;
  width = 0;
  height = 0;

  constructor(public activeModal: NgbActiveModal,
              private utilsService: UtilsService,
              private userbindService: UserBindService,
              private companyBindService: CompanyBindService,
              private loader: VulLoaderService,
              private alertService: VulAlertService) {
  }

  ngOnInit() {
    this.URL = this.URL + this.urlImage;
    this.uploader = new FileUploader({url: this.URL});
    this.cropperSettings = new CropperSettings();
    this.setSize();
    this.data = {};
    this.cropperSettings.noFileInput = true;
    this.uploader.onAfterAddingFile = f => {
      this.image = new Image();
      const file: File = f._file;
      const fileReader: FileReader = new FileReader();
      const that = this;
      fileReader.onloadend = (loadEvent: any) => {
        that.image.src = loadEvent.target.result;
        that.profileCropper.setImage(that.image);
        this.imageOrigin = loadEvent.target.result;
      };
      fileReader.readAsDataURL(file);
    };
  }

  getFileUploader() {
    this.loader.show('Actualizando imagen');
    const image = this.entity === 'company' ? this.imageOrigin : this.data.image;
    this.utilsService.getFileUploader(this.uploader, image, (data) => {
      if (this.entity === 'profile') {
        this.userbindService.sendMessage(data);
        this.loader.hide();
        this.alertService.showSuccess({text: `actualizacion de imagen exitoso.`});
      } else if (this.entity === 'company') {
        this.companyBindService.sendMessage(data);
        this.loader.hide();
        this.alertService.showSuccess({text: `actualizacion de imagen exitoso.`});
      }
      this.activeModal.dismiss('Cross click');
    }, err => {
      this.loader.hide();
      this.alertService.showError({text: `hubo un error durante la actualizacion.`});
      this.activeModal.dismiss('Cross click');
    });
  }

  setSize() {
    if (this.entity === 'profile') {
      this.width = this.sizeSquareUser;
      this.height = this.width;
    } else if (this.entity === 'company') {
      this.width = this.sizeSquareCompany;
      this.height = this.width;
    }
    this.cropperSettings.width = this.width;
    this.cropperSettings.height = this.height;

    this.cropperSettings.croppedWidth = this.width;
    this.cropperSettings.croppedHeight = this.height;

    this.cropperSettings.canvasWidth = this.width * 2;
    this.cropperSettings.canvasHeight = this.height * 2;

    this.cropperSettings.minWidth = this.width / 2;
    this.cropperSettings.minHeight = this.height / 2;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = true;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
  }
}
