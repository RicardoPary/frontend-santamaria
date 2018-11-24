import * as moment from 'moment';

const MAX_YEARS = 15;

export function loadLastYears(): number[] {
  const years: number[] = [];
  const currentYear = moment().year();
  for (let i = 0; i < MAX_YEARS; i++) {
    years.push(currentYear - i);
  }
  return years;
}

export const LAST_YEARS = loadLastYears();
