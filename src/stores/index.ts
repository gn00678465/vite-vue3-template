import type { App } from 'vue';
import { createPinia } from 'pinia';
import { resetStore } from './plugins';

export function setupStore(app: App): void {
  const pinia = createPinia();

  pinia.use(resetStore);

  app.use(pinia);
}

export * from './modules';
