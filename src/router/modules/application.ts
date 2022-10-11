import { AdminLayout } from '@/layouts';

const application: AuthRoute.Route = {
  name: 'application',
  path: '/application',
  component: AdminLayout,
  redirect: '/application/license',
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
      }
    }
  ]
};

export default application;
