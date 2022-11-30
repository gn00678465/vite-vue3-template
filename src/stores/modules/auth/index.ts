import { unref } from 'vue';
import { defineStore } from 'pinia';
import { fetchUserInfo } from '@/service/api';
import { localStorage } from '@/utils';
import { router } from '@/router';
import { getToken, cleanAuthStorage, getUserInfo } from './helpers';
import { useRouterPush } from '@/composables';
import { useRouteStore } from '../route';

interface AuthState {
  userInfo: Auth.UserInfo;
  token: string;
  loginLoading: boolean;
  logoutHandler: (() => void) | null;
}

const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
    logoutHandler: null
  }),
  getters: {
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    async loginByToken(accessToken: string) {
      let flag = false;
      const [error, data] = await fetchUserInfo(accessToken);
      if (data) {
        const { AccessToken, RefreshToken, Username } = data;
        localStorage.set('token', AccessToken);
        localStorage.set('refreshToken', RefreshToken);
        localStorage.set('userInfo', { Username });

        this.token = AccessToken;
        this.userInfo = { Username };

        flag = true;
      }

      return flag;
    },
    async handleAfterLogin(accessToken: string) {
      const { toLoginDirective } = useRouterPush(false);
      const store = useRouteStore();

      const successLogin = await this.loginByToken(accessToken);

      if (successLogin) {
        // do success
        await store.initAuthRoute();
        toLoginDirective();

        if (store.isInitAuthRoute) {
          window.$swalDialog.success({
            toast: true,
            position: 'top-end',
            timer: 3000,
            title: '登入成功',
            text: `Welcome back ${this.userInfo.Username}`,
            showConfirmButton: false
          });
        }
      }
    },
    /**
     * 清除登入相關資料
     */
    async resetAuthStore() {
      this.$reset();
      cleanAuthStorage();
    },
    /**
     * 清除登入相關資料並重導向
     */
    async resetAuthStoreWithRedirect() {
      const { toLogin } = useRouterPush(false);
      const route = unref(router.currentRoute);

      if (route.meta.requiresAuth) {
        toLogin();
      }

      this.$reset();
      cleanAuthStorage();
    },
    /**
     * 設定登出 function(3-party library)
     * @param fun 登出 function
     */
    setLogoutHandler(fun: () => void) {
      this.logoutHandler = fun;
    },
    /**
     * 登出用函式
     */
    async handleLogout() {
      const res = await this.logoutHandler?.();
      return res;
    }
  }
});

export { useAuthStore };
