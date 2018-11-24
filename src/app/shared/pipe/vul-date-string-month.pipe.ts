import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 'vulDateStringMonth'})
export class VulDateStringMonthPipe implements PipeTransform {
  datePipe = new DatePipe('es-BO');

  transform(date: string): string {
    if (!date) {
      return null;
    }
    try {
      const day = this.datePipe.transform(date, 'dd');
      const month = capitalize(this.datePipe.transform(date, 'MMMM'));
      const year = this.datePipe.transform(date, 'yyyy');
      return `${day} de ${month} de ${year}`;
    } catch (e) {
      return null;
    }

    function capitalize(value) {
      return value && value[0].toUpperCase() + value.slice(1);
    }
  }
}

