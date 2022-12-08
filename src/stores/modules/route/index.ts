import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import {
  ROOT_ROUTER,
  constantRoutes,
  router,
  routes as authRoutes
} from '@/router';
import {
  filterWithoutPermission,
  transformToVueRoutes,
  transformToMenu,
  getConstantRouteNames,
  transformRoutePathToRouteName
} from '@/utils';
import { useAuthStore } from '../auth';
import { useTabStore } from '../tab';

export const useRouteStore = defineStore('route-store', () => {
  const isInitAuthRoute: Ref<boolean> = ref(false);
  const menus: Ref<GlobalMenuOption[]> = ref([]);
  const routeHomeName: Ref<string> = ref(
    transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH)
  );

  function isValidConstRouteName(name: AuthRoute.RouteKey) {
    return (
      getConstantRouteNames(constantRoutes).includes(name) &&
      name !== 'not-found'
    );
  }

  function handleAuthRoutes(routes: AuthRoute.Route[]) {
    (menus.value as GlobalMenuOption[]) = transformToMenu(routes);
    const vueRoutes = transformToVueRoutes(routes);
    vueRoutes.forEach((route) => {
      router.addRoute(route);
    });
  }

  async function initAuthRoute() {
    const { initHomeTab } = useTabStore();

    const routes = filterWithoutPermission(authRoutes);
    handleAuthRoutes(routes);
    initHomeTab(routeHomeName.value, router);
    isInitAuthRoute.value = true;
  }

  return {
    isInitAuthRoute: isInitAuthRoute,
    menus: menus,
    handleAuthRoutes,
    initAuthRoute,
    isValidConstRouteName
  };
});
