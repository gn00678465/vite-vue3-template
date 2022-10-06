import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  Router
} from 'vue-router';
import type { App } from 'vue';
// import routes from './routes';
import { constantRoutes } from './routes';

const router: Router = createRouter({
  scrollBehavior: () => ({ top: 0, left: 0 }),
  history: createWebHashHistory(),
  routes: constantRoutes
});

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}
