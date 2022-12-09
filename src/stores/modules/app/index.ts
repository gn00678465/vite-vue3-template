import { defineStore } from 'pinia';
import { ref, nextTick } from 'vue';
import type { Ref } from 'vue';
import { useTimeoutFn } from '@vueuse/core';

export const useAppStore = defineStore('app-store', () => {
  const menuCollapse: Ref<boolean> = ref(false);
  const reloadFlag: Ref<boolean> = ref(true);

  async function reloadPage(duration = 0) {
    reloadFlag.value = false;
    await nextTick();
    if (duration) {
      useTimeoutFn(() => {
        reloadFlag.value = true;
      }, duration);
    } else {
      reloadFlag.value = true;
    }
    useTimeoutFn(() => {
      document.documentElement.scrollTo({ left: 0, top: 0 });
    }, 100);
  }

  function setMenuCollapse(state: boolean): void {
    menuCollapse.value = state;
  }

  function toggleMenuCollapse(): void {
    menuCollapse.value = !menuCollapse.value;
  }

  return {
    menuCollapse,
    setMenuCollapse,
    toggleMenuCollapse,
    reloadPage,
    reloadFlag
  };
});
