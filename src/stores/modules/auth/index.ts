import { unref } from 'vue';
import { defineStore } from 'pinia';
import { fetchUserInfo, fetchUserPermission } from '@/service/api';
import { localStorage } from '@/utils';
import { router } from '@/router';
import { getToken, cleanAuthStorage, getUserInfo } from './helpers';
import { useRouterPush } from '@/composables';
import { useRouteStore } from '../route';
import { useI18n } from '@/hooks';

interface AuthState {
  userInfo: Auth.UserInfo;
  token: string;
  loginLoading: boolean;
}

const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false
  }),
  getters: {
    isLogin(state) {
      return Boolean(state.token);
    },
    isAdmin(state) {
      return state.userInfo?.Role === 'Admin';
    }
  },
  actions: {
    /**
     * 使用 Azure token 取得 Backend Token
     * @param accessToken Azure AccessToken
     */
    async loginByToken(accessToken: string) {
      let flag = false;
      const [error, data] = await fetchUserInfo(accessToken);
      if (data) {
        const { AccessToken, RefreshToken } = data;

        this.updateToken(AccessToken, RefreshToken);

        await this.updateUserInfo();

        flag = true;
      }

      return flag;
    },
    /** 存放 token 到 localStorage */
    updateToken(AccessToken: string, RefreshToken: string) {
      localStorage.set('token', AccessToken);
      localStorage.set('refreshToken', RefreshToken);
      this.token = AccessToken;
    },
    /** 取得登入者權限 */
    async updateUserInfo() {
      const [err, data] = await fetchUserPermission();
      if (data) {
        localStorage.set('userInfo', data);
        Object.assign(this.userInfo, data);
      }
    },
    /**
     * 登入 Azure 後執行
     * @param accessToken Azure AccessToken
     */
    async handleAfterLogin(accessToken: string) {
      this.loginLoading = true;
      const { toLoginDirective } = useRouterPush(false);
      const store = useRouteStore();
      const { t } = useI18n();

      const successLogin = await this.loginByToken(accessToken);

      if (successLogin) {
        // do success
        await store.initAuthRoute();
        toLoginDirective();

        if (store.isInitAuthRoute) {
          window.$notify.success({
            duration: 3000,
            title: t('sys.login_success'),
            content: `${t('sys.login_success_message')} ${
              this.userInfo.Username
            }`
          });
        }
      }

      this.loginLoading = false;
    },
    /**
     * 清除登入相關資料
     */
    async resetAuthStore(redirect = false) {
      const { toLogin } = useRouterPush(false);
      const route = unref(router.currentRoute);

      if (route.meta.requiresAuth && redirect) {
        toLogin();
      }

      this.$reset();
      cleanAuthStorage();
    }
  }
});

export { useAuthStore };
