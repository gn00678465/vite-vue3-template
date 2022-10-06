import { AdminLayout } from '@/layouts';

const application: AuthRoute.Route = {
  name: 'application',
  path: '/application',
  component: AdminLayout,
  redirect: '/application/license',
  meta: {
    title: '申請表單',
    icon: 'AppsSharp'
  },
  children: [
    {
      name: 'application_license',
      path: 'license',
      component: () => import('@/pages/application/license'),
      meta: {
        title: '授權申請',
        icon: 'TrailSignSharp'
      }
    }
  ]
};

export default application;
