declare namespace AuthRoute {
  type RouteSplitMark = '_';

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
    /** 順序 */
    order?: number;
    /** cache page */
    keepAlive?: boolean;
  };

  interface Route {
    name: RoutePage.RouteKey;
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
