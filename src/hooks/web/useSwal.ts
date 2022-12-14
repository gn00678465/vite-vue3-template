import Swal from 'sweetalert2';
import type { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { omit } from '@/utils';

export function useSwal() {
  function createSwal(
    options: SweetAlertOptions,
    mixin: SweetAlertOptions = { icon: 'question' }
  ) {
    const swal: typeof Swal = Swal.mixin(mixin);
    return swal.fire(omit(options, ['icon']));
  }

  function successSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'success' });
  }

  function errorSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'error' });
  }

  function infoSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'info' });
  }

  function warningSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'warning' });
  }

  return {
    createSwal,
    successSwal,
    errorSwal,
    infoSwal,
    warningSwal
  };
}
