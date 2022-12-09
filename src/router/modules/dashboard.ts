import { getLayoutComponent } from '@/utils';

const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: getLayoutComponent('basic'),
  redirectPath: '/dashboard/analysis',
  meta: {
    title: '儀錶板',
    icon: 'mdi:view-dashboard',
    order: 0
  },
  children: [
    {
      name: 'dashboard_analysis',
      path: '/dashboard/analysis',
      component: () => import('@/pages/dashboard/analysis'),
      meta: {
        title: '分析',
        icon: 'icon-park-outline:analysis',
        requiresAuth: true
      }
    }
  ]
};

export default dashboard;
