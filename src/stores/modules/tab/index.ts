import { ref } from 'vue';
import type { Ref } from 'vue';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { defineStore } from 'pinia';
import { localStorage } from '@/utils';
import { useRouterPush } from '@/composables';
import {
  getIndexInTabRoutesByRouteName,
  getTabRouteByVueRoute,
  isInTabRoutes,
  getTabRoutes
} from './helpers';
import { useThemeStore } from '../theme';

export const useTabStore = defineStore('tab-store', () => {
  const tabs: Ref<App.GlobalTabRoute[]> = ref([]);
  const activeTab: Ref<string> = ref('');
  const homeTab: Ref<App.GlobalTabRoute> = ref({
    name: 'root',
    fullPath: '/',
    meta: {
      title: 'root'
    }
  });

  const theme = useThemeStore();

  function addTab(route: RouteLocationNormalizedLoaded) {
    const tab = getTabRouteByVueRoute(route);
    if (isInTabRoutes(tabs.value, tab.fullPath)) return;
    const index = getIndexInTabRoutesByRouteName(
      tabs.value,
      route.name as string
    );
    if (index === -1) {
      tabs.value.push(tab);
      return;
    }

    const { multiTab = false } = route.meta;
    if (!multiTab) {
      tabs.value.splice(index, 1, tab);
      return;
    }

    tabs.value.push(tab);
  }

  function initHomeTab(routeHomeName: string, router: Router) {
    const routes = router.getRoutes();
    const findHome = routes.find((item) => item.name === routeHomeName);
    if (findHome && !findHome.children.length) {
      homeTab.value = getTabRouteByVueRoute(findHome);
    }
  }

  function iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
    const t: App.GlobalTabRoute[] = theme.tab.isCache ? getTabRoutes() : [];
    const hasHome =
      getIndexInTabRoutesByRouteName(t, homeTab.value.name as string) > -1;
    if (!hasHome && homeTab.value.name !== 'root') {
      t.unshift(homeTab.value);
    }

    const isHome = currentRoute.fullPath === homeTab.value.fullPath;
    const index = getIndexInTabRoutesByRouteName(
      t,
      currentRoute.name as string
    );
    if (!isHome) {
      const currentTab = getTabRouteByVueRoute(currentRoute);
      if (!currentTab.meta.multiTab) {
        if (index > -1) {
          t.splice(index, 1, currentTab);
        } else {
          t.push(currentTab);
        }
      } else {
        const hasCurrent = isInTabRoutes(t, currentRoute.fullPath);
        if (!hasCurrent) {
          t.push(currentTab);
        }
      }
    }

    tabs.value = t;
    setActiveTab(currentRoute.fullPath);
  }

  function setActiveTab(fullPath: string) {
    activeTab.value = fullPath;
  }

  function handleClickTab(fullPath: string) {
    const { routerPush } = useRouterPush(false);
    const isActive = activeTab.value === fullPath;
    if (!isActive) {
      setActiveTab(fullPath);
      routerPush(fullPath);
    }
  }

  function removeTab(fullPath: string) {
    const { routerPush } = useRouterPush(false);
    const isActive = activeTab.value === fullPath;
    const updateTabs = tabs.value.filter((tab) => tab.fullPath !== fullPath);
    tabs.value = updateTabs;
    if (isActive && updateTabs.length) {
      const activePath = updateTabs[updateTabs.length - 1].fullPath;
      setActiveTab(activePath);
      routerPush(activePath);
    }
  }

  function cacheTabRoutes() {
    localStorage.set('multiTabRoutes', tabs.value);
  }

  return {
    iniTabStore,
    addTab,
    setActiveTab,
    tabs,
    activeTab,
    homeTab,
    handleClickTab,
    removeTab,
    initHomeTab,
    cacheTabRoutes
  };
});
