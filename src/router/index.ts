import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  Router
} from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  scrollBehavior: () => ({ top: 0, left: 0 }),
  history: createWebHashHistory(),
  routes
});

export default router;
