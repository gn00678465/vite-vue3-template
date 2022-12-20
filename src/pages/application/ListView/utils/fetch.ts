import { ref, watch, Ref } from 'vue';
import type { DataTableFilterState } from 'naive-ui';
import { curry } from 'ramda';
import {
  fetchApplicationForm,
  fetchApplicationFormWaitingApproval,
  fetchApplicationFormReject,
  fetchApplicationFormCancel,
  fetchApplicationWaitSN,
  fetchApplicationFinish,
  fetchApplicationCustomer
} from '@/service/api';
import { diff, isEmptyObj } from '@/utils';

export const customerDefault: Ref<any> = ref(undefined);
export const stateDefault: Ref<any> = ref(undefined);

export const fetchesObj = {
  WaitApproval: {
    label: 'WaitApproval',
    api: fetchApplicationFormWaitingApproval
  },
  WaitSN: {
    label: 'WaitSN',
    api: fetchApplicationWaitSN
  },
  Finish: {
    label: 'Finish',
    api: fetchApplicationFinish
  },
  Cancel: {
    label: 'Cancel',
    api: fetchApplicationFormCancel
  },
  Reject: {
    label: 'Reject',
    api: fetchApplicationFormReject
  }
};

export type FetchKeys = keyof typeof fetchesObj;

export function useApplicationFormFetch(
  stateFilter: Ref<DataTableFilterState | null>
) {
  const fetchApi = ref(fetchApplicationForm);
  const fetchCustomer = curry(fetchApplicationCustomer);

  watch(stateFilter, (value, old) => {
    // first
    if (!old && !!value) {
      if (value.State) {
        fetchApi.value = fetchesObj[value.State as FetchKeys].api;
      }
      if (value.Customer) {
        fetchApi.value = fetchCustomer(value.Customer as number);
      }
    }
    if (!!old && !!value) {
      const difference = diff(old, value);
      if (isEmptyObj(difference)) {
        return;
      }
      // update state
      if (difference?.State) {
        customerDefault.value = null;
        stateDefault.value = difference?.State;
        fetchApi.value = fetchesObj[difference.State as FetchKeys].api;
      }
      // reset state
      if (difference.State === null) {
        // if (customerDefault.value) return;
        fetchApi.value = fetchApplicationForm;
      }
      // update customer
      if (difference?.Customer) {
        stateDefault.value = null;
        customerDefault.value = difference?.Customer;
        fetchApi.value = fetchCustomer(value.Customer as number);
      }
      // reset customer
      if (difference.Customer === null) {
        // if (stateDefault.value) return;
        fetchApi.value = fetchApplicationForm;
      }
    }
  });

  return {
    fetchApi
  };
}
