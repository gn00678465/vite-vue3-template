import { ref, Ref } from 'vue';
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
import { useI18n } from '@/hooks';

const { t } = useI18n();

export const stateDefault: Ref<any> = ref(null);

export const fetchApi = ref(fetchApplicationForm);

export const fetchesObj = {
  WaitApproval: {
    label: t(`common.waitApproval`),
    api: fetchApplicationFormWaitingApproval
  },
  WaitSN: {
    label: t(`common.waitSN`),
    api: fetchApplicationWaitSN
  },
  Finish: {
    label: t(`common.finish`),
    api: fetchApplicationFinish
  },
  Revoke: {
    label: t(`common.revoke`),
    api: fetchApplicationFormCancel
  },
  Reject: {
    label: t(`common.reject`),
    api: fetchApplicationFormReject
  }
};

export type FetchKeys = keyof typeof fetchesObj;

export function useApplicationFormFetch(filterValue: {
  State: null | string;
  Customer: null | number;
}) {
  stateDefault.value = filterValue.State;
  if (filterValue.State) {
    fetchApi.value = fetchesObj[filterValue.State as FetchKeys]?.api;
    return;
  }
  if (filterValue.Customer) {
    const fetchCustomer = curry(fetchApplicationCustomer);
    fetchApi.value = fetchCustomer(filterValue.Customer);
    return;
  }
  fetchApi.value = fetchApplicationForm;
}
