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

  return routes;
}
