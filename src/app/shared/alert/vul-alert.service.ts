import { Injectable } from '@angular/core';
import { default as swal } from 'sweetalert2';

import { VulAlertParam } from './vul-alert-param.model';

@Injectable()
export class VulAlertService {

  showInfo(param?: VulAlertParam, onConfirm?) {
    swal({
      title: param.title || 'Información!',
      text: param.text,
      html: param.html,
      type: 'info',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showSuccess(param?: VulAlertParam, onConfirm?) {
    swal({
      title: param.title || 'Exito!',
      text: param.text,
      html: param.html,
      type: 'success',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showWarning(param?: VulAlertParam, onConfirm?) {
    swal({
      title: param.title || 'Peligro!',
      text: param.text,
      html: param.html,
      type: 'warning',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showError(param?: VulAlertParam, onConfirm?) {
    swal({
      title: param.title || 'Error!',
      text: param.text,
      html: param.html,
      type: 'error',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showQuestion(param?: VulAlertParam, onConfirm?) {
    swal({
      title: param.title || 'Confirme!',
      text: param.text,
      html: param.html,
      type: 'question',
      showCancelButton: true,
      allowOutsideClick: false
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showWarningQuestion(param?: VulAlertParam, onConfirm?) {
    swal({
      title: param.title || 'Confirme!',
      text: param.text,
      html: param.html,
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false
    }).then(onConfirm)
      .catch(() => {
      });
  }
}
