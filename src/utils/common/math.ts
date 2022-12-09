import { computed } from 'vue';
import { ComputedRef } from 'vue';
import { resolveUnref, MaybeComputedRef } from '@vueuse/core';

/**
 * 計算等差級數第幾項的值
 * @param term 第幾項
 * @param common 等差比
 */
export function useAPTerm(
  term: MaybeComputedRef<number>,
  common: MaybeComputedRef<number>
): ComputedRef<number> {
  return computed(() => {
    return (resolveUnref(term) - 1) * resolveUnref(common);
  });
}
