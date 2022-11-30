import { useRouter } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import { router as globalRouter } from '@/router';

/**
 *
 * @param inSetup setup 內設定為 true, axios 內設定為 false
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter;
  const currentRoute = router.currentRoute;

  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to);
      console.log(routerData);
    } else {
      router.push(to);
    }
  }

  function goBack() {
    router.go(-1);
  }

  function toHome(newTab = false) {
    routerPush({ name: 'root' }, newTab);
  }

  function toLogin() {
    routerPush({ name: 'login' }, false);
  }

  function toLoginDirective() {
    const { query } = currentRoute.value;
    if (query?.redirect) {
      routerPush(query.redirect as string);
    } else {
      toHome();
    }
  }

  return {
    routerPush,
    goBack,
    toHome,
    toLogin,
    toLoginDirective
  };
}
