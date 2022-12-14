declare namespace AuthRoute {
  type RouteSplitMark = '_';

  type RouteKey =
    | 'root'
    | 'login'
    | 'no-permission'
    | 'service-error'
    | 'not-found'
    | 'not-found-page'
    | 'application'
    | 'application_license'
    | 'error'
    | 'error_403'
    | 'error_404'
    | 'error_500';

  type RouteModule = Record<string, { default: AuthRoute.Route }>;

  type RouteMeta = {
    title: string;
    icon?: string;
    /**需要登入權限 */
    requiresAuth?: boolean;
    hide?: boolean;
    /**外部連結 */
    href?: string;
    permission?: string[];
    /** content 樣式 */
    contentType?: 'none' | 'card' | 'fixedCard';
  };

  interface Route {
    name: RouteKey;
    path: string;
    component?: RouteComponent;
    redirect?: string;
    meta: RouteMeta;
    children?: Route[];
    props?:
      | boolean
      | Record<string, any>
      | ((route: any) => Record<string, any>);
  }
}
