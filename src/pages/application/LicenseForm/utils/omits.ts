import { omit } from 'ramda';
import { FormValue } from '.';

export function omitFormal(formValue: FormValue) {
  return omit(['TestDays', 'PerSeat', 'Images'])(formValue);
}

export function omitPOC(formValue: FormValue) {
  return omit(['ExpiredDate', 'Images'])(formValue);
}
