import { h, VNodeChild } from 'vue';
import { NDatePicker, NInputNumber } from 'naive-ui';
import type { FormValue } from './types';
import { dateToUtcString, dateToUTCTime } from './date';

export function renderExpiredDate(formValue: FormValue): VNodeChild {
  return h(NDatePicker, {
    class: 'w-full',
    type: 'date',
    value: dateToUTCTime(formValue.ExpiredDate),
    isDateDisabled: (ts: number) => {
      return ts < Date.now() - 87200000;
    },
    'on-update:value': (value: number) => {
      formValue.ExpiredDate = dateToUtcString(value);
    }
  });
}

export function renderTestDays(formValue: FormValue): VNodeChild {
  return h(NInputNumber, {
    class: 'w-full',
    min: 0,
    max: 90,
    buttonPlacement: 'both',
    defaultValue: formValue.TestDays,
    value: formValue.TestDays,
    'on-update:value': (value: number) => {
      formValue.TestDays = value;
    }
  });
}

export function renderPerSeat(formValue: FormValue): VNodeChild {
  return h(NInputNumber, {
    class: 'w-full',
    min: 0,
    buttonPlacement: 'both',
    defaultValue: formValue.PerSeat,
    value: formValue.PerSeat,
    'on-update:value': (value: number) => {
      formValue.PerSeat = value;
    }
  });
}
