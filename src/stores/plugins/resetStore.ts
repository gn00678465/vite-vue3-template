import type { PiniaPluginContext } from 'pinia';
import { clone } from 'ramda';

export function resetStore(context: PiniaPluginContext) {
  const { $state } = context.store;
  const initialState = clone($state);
  context.store.$reset = () => context.store.$dispatch(clone(initialState));
}
