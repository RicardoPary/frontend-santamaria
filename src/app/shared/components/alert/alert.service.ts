import { Injectable } from '@angular/core';
import { default as swal } from 'sweetalert2';

import { AlertParam } from './alert-param.model';

@Injectable()
export class AlertService {

  showInfo(param?: AlertParam, onConfirm?) {
    swal({
      title: param.title || 'Información!',
      text: param.text,
      html: param.html,
      type: 'info',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showSuccess(param?: AlertParam, onConfirm?) {
    swal({
      title: param.title || 'Exito!',
      text: param.text,
      html: param.html,
      type: 'success',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showWarning(param?: AlertParam, onConfirm?) {
    swal({
      title: param.title || 'Peligro!',
      text: param.text,
      html: param.html,
      type: 'warning',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showError(param?: AlertParam, onConfirm?) {
    swal({
      title: param.title || 'Error!',
      text: param.text,
      html: param.html,
      type: 'error',
    }).then(onConfirm)
      .catch(() => {
      });
  }

  showQuestion(param?: AlertParam, onConfirm?) {
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

  showWarningQuestion(param?: AlertParam, onConfirm?) {
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
