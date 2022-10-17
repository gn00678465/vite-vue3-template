import { useRouter } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import { router as globalRouter } from '@/router';

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

  function goHome(newTab = false) {
    routerPush({ name: 'root' }, newTab);
  }

  function goLogin() {}

  function goLoginDirective() {}

  return {
    routerPush,
    goBack,
    goHome,
    goLogin,
    goLoginDirective
  };
}
