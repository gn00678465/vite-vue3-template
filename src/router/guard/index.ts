import { createPermissionGuard } from './permission';
import type { Router } from 'vue-router';

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    window.$loadingBar?.start();
    await createPermissionGuard(to, from, next);
  });
  router.afterEach((to, from) => {
    window.$loadingBar?.finish();
  });
}
