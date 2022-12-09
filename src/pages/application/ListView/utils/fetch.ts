import { ref, watch, Ref } from 'vue';
import {
  fetchApplicationForm,
  fetchApplicationFormWaitingApproval,
  fetchApplicationFormReject,
  fetchApplicationFormCancel,
  fetchApplicationWaitSN,
  fetchApplicationFinish
} from '@/service/api';

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

export function useApplicationFormFetch(stateFilter: Ref<FetchKeys | null>) {
  const fetchApi = ref(fetchApplicationForm);

  watch(stateFilter, (value) => {
    if (value) {
      fetchApi.value = fetchesObj[value].api;
    } else {
      fetchApi.value = fetchApplicationForm;
    }
  });

  return {
    fetchApi
  };
}
