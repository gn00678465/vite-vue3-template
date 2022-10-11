declare namespace AuthRoute {
  type RouteSplitMark = '_';

  type RouteKey =
    | 'root'
    | 'login'
    | 'no-permission'
    | 'service-error'
    | 'not-found'
    | 'application'
    | 'application_license';

  type RouteModule = Record<string, { default: AuthRoute.Route }>;

  type RouteMeta = {
    title: string;
    icon?: string;
  };

  interface Route {
    name: RouteKey;
    path: string;
    redirect?: string;
    component?: any;
    meta?: RouteMeta;
    children?: Route[];
    props?:
      | boolean
      | Record<string, any>
      | ((route: any) => Record<string, any>);
  }
}
