import {
  useRouter,
  useRoute,
  RouteRecordRaw,
  RouteLocationRaw
} from 'vue-router';
import type { Types } from '.';

export const formRoute = (title: string): RouteRecordRaw & AuthRoute.Route => ({
  name: 'application-form_license-form',
  path: '/application-form/license-form/:id?',
  component: () => import('@/pages/application/LicenseForm'),
  meta: {
    title: title,
    icon: 'clarity:license-line',
    requiresAuth: true
  }
});

export function useApplicationFormRoute(
  routerPush: (to: RouteLocationRaw, newTab?: boolean) => void
) {
  const router = useRouter();
  function pushCreateForm(key: Types) {
    // appendRoute('application-form', formRoute('建立表單'));
    routerPush({
      name: 'application-form_license-form',
      query: { type: key }
    });
  }

  function pushSelectForm(params: { params: any; query: any }) {
    // appendRoute('application-form', formRoute('檢視表單'));
    routerPush({
      name: 'application-form_license-form',
      ...params
    });
  }

  function appendRoute(name: string, route: RouteRecordRaw & AuthRoute.Route) {
    return router.addRoute(name, route);
  }

  return {
    pushCreateForm,
    pushSelectForm,
    appendRoute
  };
}
