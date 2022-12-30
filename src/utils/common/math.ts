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
    if (resolveUnref(term) <= 0 || resolveUnref(common) < 0) return 0;
    return (resolveUnref(term) - 1) * resolveUnref(common);
  });
}
