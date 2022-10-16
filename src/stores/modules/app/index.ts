import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export const useAppStore = defineStore('app-store', () => {
  const menuCollapse: Ref<boolean> = ref(false);

  function setMenuCollapse(state: boolean): void {
    menuCollapse.value = state;
  }

  function toggleMenuCollapse(): void {
    menuCollapse.value = !menuCollapse.value;
  }

  return {
    menuCollapse,
    setMenuCollapse,
    toggleMenuCollapse
  };
});
