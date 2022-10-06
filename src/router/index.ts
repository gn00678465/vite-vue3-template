import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  Router
} from 'vue-router';
import type { App } from 'vue';
// import routes from './routes';
import { constantRoutes } from './routes';
import { routes } from './modules';

const router: Router = createRouter({
  scrollBehavior: () => ({ top: 0, left: 0 }),
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes: [...constantRoutes, ...routes]
});

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}

export * from './modules';
