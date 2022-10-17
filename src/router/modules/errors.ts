import { getLayoutComponent } from '@/utils';

const errors: AuthRoute.Route = {
  name: 'error',
  path: '/error',
  component: getLayoutComponent('basic'),
  redirect: '/error/403',
  meta: {
    title: '錯誤頁面',
    icon: 'fluent:error-circle-12-regular'
  },
  children: [
    {
      name: 'error_403',
      path: '/error/403',
      component: () => import('@/pages/system/NoPermission'),
      meta: {
        title: '無權限',
        icon: 'fluent:shield-error-16-regular'
      }
    },
    {
      name: 'error_404',
      path: '/error/404',
      component: () => import('@/pages/system/NotFound'),
      meta: {
        title: '無此頁面',
        icon: 'fluent:calendar-error-20-regular'
      }
    },
    {
      name: 'error_500',
      path: '/error/500',
      component: () => import('@/pages/system/ServiceError'),
      meta: {
        title: '伺服器錯誤',
        icon: 'fluent:error-circle-settings-16-regular'
      }
    }
  ]
};

export default errors;
