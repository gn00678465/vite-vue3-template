import { useEventListener } from '@vueuse/core';
import { useTabStore } from '@/stores/modules/tab';

export function useGlobalEvents() {
  // const tab = useTabStore();

  useEventListener(window, 'beforeunload', () => {
    // tab.cacheTabRoutes();
  });
}
