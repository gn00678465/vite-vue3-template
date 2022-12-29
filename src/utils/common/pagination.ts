import { unref } from 'vue';
import { MaybeRef } from '@vueuse/core';

export function pagination<T = any>(
  arr: MaybeRef<T[]>,
  size: MaybeRef<number>
) {
  return unref(arr).reduce((list: Array<Array<T>>, value, index) => {
    const idx = Math.floor(index / unref(size));
    const page = list[idx] || (list[idx] = []);
    page.push(value);
    return list;
  }, []);
}
