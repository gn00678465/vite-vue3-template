import { handleRouteModules } from '@/utils';

const modules = import.meta.glob('./**.ts', {
  eager: true
}) as AuthRoute.RouteModule;

export const routes = handleRouteModules(modules);
