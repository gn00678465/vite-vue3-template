import { routeName } from '@/router';
import { useRouteStore } from '@/stores/modules/route';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { localStorage } from '@/utils';

export async function createDynamicRouterGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const route = useRouteStore();
  const isLogin = Boolean(localStorage.get('token'));

  if (!route.isInitAuthRoute) {
    if (!isLogin) {
      const toName = to.name as RoutePage.RouteKey;
      if (route.isValidConstRouteName(toName) && !to.meta.requiresAuth) {
        next();
      } else {
        // const redirect = to.fullPath;
        // next({ name: routeName('login'), query: { redirect } });
        next({ name: routeName('login') });
      }
      return false;
    }
    await route.initAuthRoute();

    if (to.name === 'not-found') {
      const path =
        to.redirectedFrom?.name === routeName('root') ? '/' : to.fullPath;
      next({
        path,
        replace: true,
        query: to.query,
        hash: to.hash
      });
      return false;
    }
  }

  if (to.name === 'not-found') {
    next({ name: routeName('not-found-page'), replace: true });
    return false;
  }
  return true;
}
