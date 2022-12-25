import { effectScope, onScopeDispose, watchEffect } from 'vue';
import { useThemeStore } from '../modules';

export function subscribeThemeStore() {
  const theme = useThemeStore();
  const scope = effectScope();
  const { addDarkClass, removeDarkClass } = handleCssDarkMode();

  scope.run(() => {
    watchEffect(() => {
      if (theme.darkMode) {
        addDarkClass();
      } else {
        removeDarkClass();
      }
    });
  });
}

/** css DarkMode */
function handleCssDarkMode() {
  const DARK_CLASS = 'dark';
  function addDarkClass() {
    document.documentElement.classList.add(DARK_CLASS);
  }
  function removeDarkClass() {
    document.documentElement.classList.remove(DARK_CLASS);
  }
  return {
    addDarkClass,
    removeDarkClass
  };
}
