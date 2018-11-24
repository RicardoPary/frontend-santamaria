import * as moment from 'moment';

const MAX_YEARS = 15;

export function loadYears(): number[] {
  const years: number[] = [];
  const currentYear = moment().year();
  for (let i = 0; i < MAX_YEARS; i++) {
    years.push(currentYear - i);
  }
  return years;
}

export const ALLMONTHS = [
  { name: 'Enero', value: 1 },
  { name: 'Febrero', value: 2 },
  { name: 'Marzo', value: 3 },
  { name: 'Abril', value: 4 },
  { name: 'Mayo', value: 5 },
  { name: 'Junio', value: 6 },
  { name: 'Julio', value: 7 },
  { name: 'Agosto', value: 8 },
  { name: 'Septiembre', value: 9 },
  { name: 'Octubre', value: 10 },
  { name: 'Noviembre', value: 11 },
  { name: 'Diciembre', value: 12 },
];

export function formatToDate(date): string {
  return moment(date).format('YYYY-MM-DD');
}
