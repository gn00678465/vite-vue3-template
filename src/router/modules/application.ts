import { getLayoutComponent } from '@/utils';

const application: AuthRoute.Route = {
  name: 'application',
  path: '/application',
  component: getLayoutComponent('basic'),
  redirectPath: '/application/license',
  meta: {
    title: '申請表單',
    icon: 'fluent:form-new-20-regular'
  },
  children: [
    {
      name: 'application_license',
      path: '/application/license',
      component: () => import('@/pages/application/license'),
      meta: {
        title: '授權申請',
        icon: 'clarity:license-line',
        requiresAuth: true
      }
    },
    {
      name: 'application_log',
      path: '/application/log',
      component: () => import('@/pages/application/license'),
      meta: {
        title: '申請紀錄',
        icon: 'octicon:log-24',
        requiresAuth: true
      }
    }
  ]
};

export default application;
