function sortRoutes(routes: AuthRoute.Route[]) {
  return routes.sort(handleSort);
}

function handleSort(next: AuthRoute.Route, prev: AuthRoute.Route) {
  return Number(next.meta?.order) - Number(prev.meta?.order);
}

export function handleRouteModules(modules: AuthRoute.RouteModule) {
  const routes: AuthRoute.Route[] = [];
  Object.keys(modules).forEach((module) => {
    const route = modules[module].default;
    if (route) {
      routes.push(route);
    } else {
      throw Error('Router error');
    }
  });

  return sortRoutes(routes);
}
