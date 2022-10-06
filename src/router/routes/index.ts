export const ROOT_ROUTER: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_BASE_ROUTE_PATH
};

export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTER,
  {
    name: 'login',
    path: '/login',
    component: () => import('../../pages/System/Login'),
    props: (route) => {
      const moduleType =
        (route.params.module as EnumType.LoginModuleKey) || 'pwd-login';
      return {
        module: moduleType
      };
    }
  }
];
