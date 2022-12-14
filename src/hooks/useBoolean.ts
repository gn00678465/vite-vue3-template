import { ref } from 'vue';
import type { Ref } from 'vue';

interface IReturnType {
  bool: Ref<boolean>;
  setBool: (arg0: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export function useBoolean(initState?: boolean): IReturnType {
  const bool = ref(!!initState);
  function setBool(state: boolean) {
    bool.value = state;
  }

  function setTrue() {
    bool.value = true;
  }

  function setFalse() {
    bool.value = false;
  }

  function toggle() {
    bool.value = !bool.value;
  }

  return { bool, setBool, setTrue, setFalse, toggle };
}
