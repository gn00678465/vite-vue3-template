import type {
  RouteLocationNormalizedLoaded,
  RouteRecordNormalized
} from 'vue-router';
import { localStorage } from '@/utils';

export function getIndexInTabRoutesByRouteName(
  tabs: App.GlobalTabRoute[],
  routeName: string
) {
  return tabs.findIndex((tab) => tab.name === routeName);
}

export function getTabRouteByVueRoute(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded
) {
  const fullPath = hasFullPath(route) ? route.fullPath : route.path;
  const tabRoute = {
    name: route.name,
    fullPath,
    meta: route.meta,
    scrollPosition: {
      left: 0,
      top: 0
    }
  };
  return tabRoute;
}

export function hasFullPath(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded
): route is RouteLocationNormalizedLoaded {
  return Boolean((route as RouteLocationNormalizedLoaded).fullPath);
}

export function getIndexInTabRoutes(
  tabs: App.GlobalTabRoute[],
  fullPath: string
) {
  return tabs.findIndex((tab) => tab.fullPath === fullPath);
}

export function isInTabRoutes(tabs: App.GlobalTabRoute[], fullPath: string) {
  return getIndexInTabRoutes(tabs, fullPath) > -1;
}

export function getTabRoutes() {
  const routes: App.GlobalTabRoute[] = [];
  const data: App.GlobalTabRoute[] = localStorage.get('multiTabRoutes');
  if (data) {
    const defaultTabRoutes = data.map((item) => ({
      ...item,
      scrollPosition: {
        left: 0,
        top: 0
      }
    }));
    routes.push(...defaultTabRoutes);
  }
  return routes;
}

export function clearTabRoutes() {
  localStorage.set('multiTabRoutes', []);
}
