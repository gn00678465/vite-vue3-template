import type { Ref } from 'vue';
import { useBoolean } from './useBoolean';

export interface UseLoadingReturn {
  loading: Ref<boolean>;
  loadingStart: () => void;
  loadingEnd: () => void;
}

export function useLoading(initialState = false): UseLoadingReturn {
  const { bool, setTrue, setFalse } = useBoolean(initialState);

  return {
    loading: bool,
    loadingStart: setTrue,
    loadingEnd: setFalse
  };
}
