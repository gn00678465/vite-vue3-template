import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { InjectionKey, ComputedRef, Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import type { MaybeComputedElementRef } from '@vueuse/core';

interface IReturnType {
  provideContentHeightKey: InjectionKey<ComputedRef<number>>;
}

export const useLayoutStore = defineStore('layout-store', (): IReturnType => {
  /**
   * 給 layout provide 使用的 key
   */
  const provideContentHeightKey = Symbol('ContentHeight');

  return { provideContentHeightKey };
});
