import { ref, computed, reactive } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import { darkTheme } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';
import { getNaiveThemeOverrides } from './helpers';
import { themeSetting } from '@/settings';

export const useThemeStore = defineStore('theme-store', () => {
  const darkMode: Ref<boolean> = ref(false);
  const tab = reactive({ isCache: true, mode: 'chrome' });
  const header = reactive({
    hight: 56,
    locales: {
      enabled: true
    }
  });
  const themeColor = ref<string>(themeSetting.themeColor);

  const naiveTheme: ComputedRef<GlobalTheme | null> = computed(() => {
    return darkMode.value ? darkTheme : null;
  });

  function setDarkMode(setMode: boolean): void {
    darkMode.value = setMode;
  }

  const naiveThemeOverrides = computed(() => {
    return getNaiveThemeOverrides({
      primary: themeColor.value,
      ...themeSetting.otherColor
    });
  });

  return {
    darkMode,
    naiveTheme,
    setDarkMode,
    tab,
    header,
    themeColor,
    naiveThemeOverrides
  };
});
