import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  Router
} from 'vue-router';
import type { App } from 'vue';
// import routes from './routes';
import { constantRoutes } from './routes';
import { createRouterGuard } from './guard';
import { transformToVueRoutes } from '../utils/router/helps';

export const router: Router = createRouter({
  scrollBehavior: () => ({ top: 0, left: 0 }),
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes: transformToVueRoutes(constantRoutes)
});

export async function setupRouter(app: App) {
  createRouterGuard(router);
  app.use(router);
  await router.isReady();
}

export function routeName(name: AuthRoute.RouteKey) {
  return name;
}

export * from './routes';
export * from './modules';
