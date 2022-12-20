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

  function createSuccessSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'success' });
  }

  function createErrorSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'error' });
  }

  function createInfoSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'info' });
  }

  function createWarningSwal(options: SweetAlertOptions) {
    return createSwal({ ...options }, { icon: 'warning' });
  }

  return {
    createSwal,
    createSuccessSwal,
    createErrorSwal,
    createInfoSwal,
    createWarningSwal
  };
}
