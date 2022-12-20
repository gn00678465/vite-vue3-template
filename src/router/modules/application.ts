import { getLayoutComponent } from '@/utils';

const application: AuthRoute.Route = {
  name: 'application-form',
  path: '/application',
  component: getLayoutComponent('basic'),
  redirectPath: '/application-form/list-view',
  meta: {
    title: '表單申請',
    icon: 'fluent:form-new-20-regular',
    order: 2
  },
  children: [
    {
      name: 'application-form_list-view',
      path: '/application-form/list-view',
      component: () => import('@/pages/application/ListView'),
      meta: {
        title: '申請單列表',
        icon: 'clarity:license-line',
        requiresAuth: true
      }
    },
    {
      name: 'application-form_customer-list',
      path: '/application-form/customer-list',
      component: () => import('@/pages/application/CustomerList'),
      meta: {
        title: '客戶清單',
        icon: 'clarity:license-line',
        requiresAuth: true
      }
    },
    {
      name: 'application-form_license-form',
      path: '/application-form/license-form/:id?',
      component: () => import('@/pages/application/LicenseForm'),
      meta: {
        title: '建立申請單',
        icon: 'clarity:license-line',
        requiresAuth: true,
        hide: true
      }
    }
  ]
};

export default application;
