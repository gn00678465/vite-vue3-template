import { shallowRef, ShallowRef, shallowReactive, ShallowReactive } from 'vue';
import { produce, Draft } from 'immer';

type Recipe<T> = (arg: Draft<T>) => any;

export type UseImmerReturnType<T> = [
  ShallowRef<T>,
  (recipe: Recipe<T>) => void
];

export function useImmer<T>(initState: T): UseImmerReturnType<T> {
  const state = shallowRef<T>(initState);
  const update = (recipe: Recipe<T>) => {
    state.value = produce(state.value, recipe);
  };

  return [state, update];
}

export type UseImmerReactiveReturnType<T> = [
  ShallowReactive<T>,
  (recipe: Recipe<T>) => void
];

export function useImmerReactive<T extends object>(
  initialState: T
): UseImmerReactiveReturnType<T> {
  const state = shallowReactive<T>(Object.assign({}, initialState));

  const update = (recipe: Recipe<T>) => {
    Object.assign(state, produce(state, recipe));
  };

  return [state, update];
}
