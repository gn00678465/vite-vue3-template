import { defineComponent } from 'vue';
import type { Ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { InteractionType } from '@azure/msal-browser';
import { useMsal } from './utils';
import { loginRequest } from '@/config';
import { useAuthStore } from '@/stores';
import { useI18n } from '@/hooks';
import { localStorage } from '@/utils';

export default defineComponent({
  name: 'OAuth',
  setup() {
    const { instance } = useMsal();
    const { handleAfterLogin } = useAuthStore();
    const { t } = useI18n();

    function handleLogin() {
      instance.loginPopup(loginRequest).then(async (res) => {
        await handleAfterLogin(res.accessToken);
        localStorage.set('loginType', 'azure');
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
          {t('sys.azure_login')}
        </NButton>
      </div>
    );
  }
});
