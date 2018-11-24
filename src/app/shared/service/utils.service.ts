import {Injectable} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class UtilsService {
  token: string;

  constructor(private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService) {
  }

  formatDateStruct(date: NgbDateStruct, separator?: string) {
    if (separator == null) {
      separator = '/';
    }
    return ((date.day > 9) ? date.day : '0' + date.day) + separator + ((date.month > 9) ?
      date.month :
      '0' + date.month) + separator + date.year;
  }

  formateDateStructToISO(date: NgbDateStruct) {
    return date.year + '-' + ((date.month > 9) ?
      date.month :
      '0' + date.month) + '-' + ((date.day > 9) ? date.day : '0' + date.day);
  }

  downloadTxtFile(response, filename?: string) {
    if (!filename) {
      filename = 'file.txt';
    }
    this.downloadFile(response, filename, 'data:attachment/text');
  }

  downloadCsvFile(response, filename?: string) {
    if (!filename) {
      filename = 'file.csv';
    }
    this.downloadFile(response, filename, 'application/vnd.ms-excel');
  }

  download7zFile(response, filename?: string) {
    if (!filename) {
      filename = 'file.7z';
    }
    this.downloadFile(response, filename, 'application/x-7z-compressed');
  }

  private downloadFile(response, filename: string, type: string) {
    const blob = new Blob([(<any>response)._body], {type: type});
    const blobURL = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = blobURL;
    window.document.body.appendChild(anchor);
    anchor.click();
    window.document.body.removeChild(anchor);
    URL.revokeObjectURL(blobURL);
  }

  getUuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getFileUploader(uploader, imgBase64, success, error) {
    this.token = this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    uploader.setOptions({
      itemAlias: 'file',
      isHTML5: true,
      headers: [
        {
          name: 'Authorization', value: 'Bearer ' + this.token
        }
      ]
    });
    const blob = this.dataURItoBlob(imgBase64);
    uploader.onBeforeUploadItem = function (item) {
      item._file = blob;
    };
    uploader.uploadAll();
    uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200) {
        success(JSON.parse(response));
      } else if (status === 0) {
        error('error');
      }
    };
  }

  dataURItoBlob = function (dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };
}
