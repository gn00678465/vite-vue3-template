import { RouteRecordRaw } from 'vue-router';

export function getConstantRouteNames(routes: AuthRoute.Route[]) {
  return routes.map(getConstantRouteName).flat(1);
}

export function getConstantRouteName(route: AuthRoute.Route) {
  const names = [route.name];
  if (hasChildren(route)) {
    console.log(route);
  }
  return names;
}

export function transformToVueRoutes(routes: AuthRoute.Route[]) {
  return routes.map((route) => transformToVueRoute(route)).flat(1);
}

export function transformToVueRoute(item: AuthRoute.Route) {
  const resultRoute: RouteRecordRaw[] = [];
  const itemRoute = { ...item } as RouteRecordRaw;

  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.Route[])
      .map((child) => transformToVueRoute(child))
      .flat();

    const redirectPath =
      children.find((child) => !hasChildren(child))?.path ?? '/';

    itemRoute.redirect = redirectPath;
  }

  resultRoute.push(itemRoute);

  return resultRoute;
}

export function hasChildren(item: AuthRoute.Route | RouteRecordRaw): boolean {
  return Boolean(item?.children && item?.children?.length);
}
