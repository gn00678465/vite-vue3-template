import {
  useRouter,
  useRoute,
  RouteRecordRaw,
  RouteLocationRaw
} from 'vue-router';
import type { Types } from '.';
import { execStrategyActions } from '@/utils';

export function useApplicationFormRoute(
  routerPush: (to: RouteLocationRaw, newTab?: boolean) => void
) {
  const router = useRouter();

  function handleTypesRouter(type: Types, params: any = {}) {
    const actions: Common.StrategyActions = [
      [
        type === 'Formal',
        () => {
          routerPush({
            name: 'application-form_formal',
            ...params
          });
        }
      ],
      [
        type === 'POC',
        () => {
          routerPush({
            name: 'application-form_poc',
            ...params
          });
        }
      ],
      [
        type === 'FunctionModule',
        () => {
          routerPush({
            name: 'application-form_functional-module',
            ...params
          });
        }
      ]
    ];
    execStrategyActions(actions);
  }

  function pushCreateForm(type: Types, params?: any) {
    handleTypesRouter(type, params);
  }

  function pushSelectForm(type: Types, params: any) {
    handleTypesRouter(type, params);
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
