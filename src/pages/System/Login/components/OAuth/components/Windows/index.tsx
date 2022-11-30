import { defineComponent } from 'vue';
import type { Ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { InteractionType } from '@azure/msal-browser';
import { useMsal, useIsAuthenticated, useMsalAuthentication } from './utils';
import { loginRequest } from '@/config';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'OAuth',
  setup() {
    const { instance } = useMsal();
    const { handleAfterLogin, setLogoutHandler } = useAuthStore();

    function handleLogin() {
      instance.loginPopup(loginRequest).then(async (res) => {
        await handleAfterLogin(res.accessToken);
        setLogoutHandler(() => {
          const res = instance.logoutPopup({
            mainWindowRedirectUri: '/'
          });
          return res;
        });
      });
    }

    return () => (
      <div>
        <NButton
          class="w-full"
          size="large"
          v-slots={{
            icon: () => <Icon icon="mdi:microsoft" color="#0178d4" />
          }}
          on-click={handleLogin}
        >
          使用 Azure 登入
        </NButton>
      </div>
    );
  }
});
