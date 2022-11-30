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
  getConstantRouteNames
} from '@/utils';

export const useRouteStore = defineStore('route-store', () => {
  const isInitAuthRoute: Ref<boolean> = ref(false);
  const menus: Ref<GlobalMenuOption[]> = ref([]);

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
    const routes = filterWithoutPermission(authRoutes);
    handleAuthRoutes(routes);
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
