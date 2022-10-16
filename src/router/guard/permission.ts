import { createDynamicRouterGuard } from './authRoutes';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const permission = await createDynamicRouterGuard(to, from, next);
  if (!permission) return;
  next();
}
