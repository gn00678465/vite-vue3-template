import { createDynamicRouterGuard } from './authRoutes';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { routeName } from '@/router';
import { getToken } from '@/utils';
import { useAuthStore } from '@/stores';

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const permission = await createDynamicRouterGuard(to, from, next);
  if (!permission) return;

  // 開啟外部連結並返回上一個 route
  if (to.meta.href) {
    window.open(to.meta.href as string);
    next({ path: from.fullPath, replace: true, query: from.query });
    return;
  }

  const isLogin = Boolean(getToken());
  const needLogin = Boolean(to.meta.requiresAuth);

  if (isLogin && to.name === routeName('login')) {
    next({ name: routeName('root') });
  }

  if (!needLogin) {
    next();
  }

  if (!isLogin && needLogin) {
    next({ name: routeName('login') });
  }

  if (isLogin && needLogin) {
    next();
  }
}
