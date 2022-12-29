import { FormValue } from './index';

export function includeImage(formValue: FormValue): boolean {
  return (
    (formValue.TestDays as number) > 45 || (formValue.PerSeat as number) > 30
  );
}
