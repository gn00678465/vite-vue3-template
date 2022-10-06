import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import { darkTheme } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';

export const useThemeStore = defineStore('theme-store', () => {
  const darkMode: Ref<boolean> = ref(false);

  const naiveTheme: ComputedRef<GlobalTheme | null> = computed(() => {
    return darkMode.value ? darkTheme : null;
  });

  function setDarkMode(setMode: boolean): void {
    darkMode.value = setMode;
  }

  return { darkMode, naiveTheme, setDarkMode };
});
