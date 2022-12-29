import { getLayoutComponent } from '@/utils';

const application: AuthRoute.Route = {
  name: 'application-form',
  path: '/application',
  component: getLayoutComponent('basic'),
  redirect: '/application-form/list-view',
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
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      name: 'application-form_customer-list',
      path: '/application-form/customer-list',
      component: () => import('@/pages/application/CustomerList'),
      meta: {
        title: '客戶清單',
        icon: 'clarity:license-line',
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      name: 'application-form_formal',
      path: '/application-form/formal/:id?',
      component: () => import('@/pages/application/LicenseForm'),
      props: (route) => ({
        formType: 'Formal',
        formId: route.params.id
      }),
      meta: {
        title: '正式申請單',
        icon: 'clarity:license-line',
        requiresAuth: true,
        hide: true
      }
    },
    {
      name: 'application-form_poc',
      path: '/application-form/poc/:id?',
      component: () => import('@/pages/application/LicenseForm'),
      props: (route) => ({
        formType: 'POC',
        formId: route.params.id
      }),
      meta: {
        title: 'POC 申請單',
        icon: 'clarity:license-line',
        requiresAuth: true,
        hide: true
      }
    },
    {
      name: 'application-form_functional-module',
      path: '/application-form/functional-module/:id?',
      component: () => import('@/pages/application/LicenseForm'),
      props: (route) => ({
        formType: 'FunctionModule',
        formId: route.params.id,
        formalId: route.query.formalId
      }),
      meta: {
        title: '功能模組申請單',
        icon: 'clarity:license-line',
        requiresAuth: true,
        hide: true
      }
    }
  ]
};

export default application;
