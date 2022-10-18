import { defineComponent, Fragment, h } from 'vue';
import Swal from 'sweetalert2';
import type { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { useDialogApiProvide } from './context';
import { omit } from '@/utils';

export interface ISwalDialogApi {
  create: (arg0: SweetAlertOptions) => Promise<SweetAlertResult<any>>;
  error: (arg0: SweetAlertOptions) => Promise<SweetAlertResult<any>>;
  info: (arg0: SweetAlertOptions) => Promise<SweetAlertResult<any>>;
  success: (arg0: SweetAlertOptions) => Promise<SweetAlertResult<any>>;
  warning: (arg0: SweetAlertOptions) => Promise<SweetAlertResult<any>>;
}

export const SwalProvider = defineComponent({
  name: 'SwalProvider',
  setup(props, { slots }) {
    function create(
      options: SweetAlertOptions,
      mixin: SweetAlertOptions = { icon: 'question' }
    ) {
      const swal: typeof Swal = Swal.mixin(mixin);
      return swal.fire(omit(options, ['icon']));
    }

    const typedApi = (
      ['success', 'error', 'info', 'warning'] as Array<
        'success' | 'error' | 'info' | 'warning'
      >
    ).map((type) => (options: SweetAlertOptions) => {
      return create({ ...options }, { icon: type });
    });

    const api: ISwalDialogApi = {
      create: create,
      success: typedApi[0],
      error: typedApi[1],
      info: typedApi[2],
      warning: typedApi[3]
    };

    useDialogApiProvide(api);
    return () => h(Fragment, null, slots.default?.());
  }
});
