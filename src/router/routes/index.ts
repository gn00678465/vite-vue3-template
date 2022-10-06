import { RouteRecordRaw } from 'vue-router';

export const ROOT_ROUTER = {
  name: 'root',
  path: '/',
  redirect: '/login'
};

export const constantRoutes: RouteRecordRaw[] = [
  ROOT_ROUTER,
  {
    name: 'LoginPage',
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
