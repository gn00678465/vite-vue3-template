import { provide, inject } from 'vue';
import type { InjectionKey } from 'vue';

export function useContext<T>(contextName: string) {
  const injectKey: InjectionKey<T> = Symbol(contextName);

  function useProvide(context: T) {
    provide(injectKey, context);
    return context;
  }

  function useInject() {
    const result = inject(injectKey, null) as T | null;
    if (!result) return null;
    return result;
  }

  return {
    useProvide,
    useInject
  };
}
