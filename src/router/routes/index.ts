export const ROOT_ROUTER: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'root'
  }
};

export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTER,
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/system/Login'),
    meta: {
      title: '登入頁面'
    },
    props: (route) => {
      const moduleType =
        (route.params.module as EnumType.LoginModuleKey) || 'pwd-login';
      return {
        module: moduleType
      };
    }
  },
  {
    name: 'no-permission',
    path: '/no-permission',
    component: () => import('@/pages/system/NoPermission'),
    meta: {
      title: '無權限'
    }
  },
  {
    name: 'service-error',
    path: '/service-error',
    component: () => import('@/pages/system/ServiceError'),
    meta: {
      title: '伺服器錯誤'
    }
  },
  {
    name: 'not-found-page',
    path: '/not-found',
    component: () => import('@/pages/system/NotFound'),
    meta: {
      title: '頁面不存在'
    }
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    meta: {
      title: '頁面不存在'
    }
  }
];
