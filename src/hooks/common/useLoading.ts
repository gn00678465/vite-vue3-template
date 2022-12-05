import type { Ref } from 'vue';
import { useBoolean } from './useBoolean';

interface IReturnType {
  loading: Ref<boolean>;
  loadingStart: () => void;
  loadingEnd: () => void;
}

export function useLoading(initialState = false): IReturnType {
  const { bool, setTrue, setFalse } = useBoolean(initialState);

  return {
    loading: bool,
    loadingStart: setTrue,
    loadingEnd: setFalse
  };
}
