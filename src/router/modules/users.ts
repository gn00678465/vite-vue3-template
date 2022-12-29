import { getLayoutComponent } from '@/utils';

const dashboard: AuthRoute.Route = {
  name: 'users',
  path: '/users',
  component: getLayoutComponent('basic'),
  redirect: '/users/list-view',
  meta: {
    title: '使用者',
    icon: 'fa-solid:users',
    order: 1
  },
  children: [
    {
      name: 'users_list-view',
      path: '/users/list-view',
      component: () => import('@/pages/users/ListView'),
      meta: {
        title: '清單',
        icon: 'material-symbols:list-alt-outline',
        requiresAuth: true,
        keepAlive: true
      }
    }
  ]
};

export default dashboard;
