import { defineComponent, computed, Transition } from 'vue';
import type { Component, PropType } from 'vue';
import { EnumLoginModules } from '@/enum';
import { useAppInfo } from '@/composables';
import { useThemeStore } from '@/stores';
import { NCard, NGradientText, NSwitch } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { PwdLogin, OAuth } from './components';
import SystemLogo from '@/components/common/SystemLogo.vue';

interface LoginModule {
  key: EnumType.LoginModuleKey;
  label: EnumLoginModules;
  component: Component;
}

export default defineComponent({
  name: 'LoginPage',
  props: {
    module: {
      type: String as PropType<EnumType.LoginModuleKey>,
      required: true
    }
  },
  setup(props, ctx) {
    const { title } = useAppInfo();

    const theme = useThemeStore();

    const modules: LoginModule[] = [
      {
        key: 'pwd-login',
        label: EnumLoginModules['pwd-login'],
        component: PwdLogin
      },
      {
        key: 'oauth',
        label: EnumLoginModules['oauth'],
        component: OAuth
      }
    ];

    const activeModule = computed(() => {
      const active: LoginModule = { ...modules[1] };
      return active;
    });

    const tag: Component = activeModule.value.component;

    return () => (
      <div class="relative, flex items-center justify-center w-full h-full">
        <NSwitch
          value={theme.darkMode}
          class="absolute top-[24px] left-[48px]"
          on-update:value={theme.setDarkMode}
        >
          {{
            'unchecked-icon': () => <Icon icon="mdi:white-balance-sunny" />,
            'checked-icon': () => <Icon icon="mdi:moon-waning-crescent" />
          }}
        </NSwitch>
        <NCard
          class="w-auto rounded-[20px] shadow-sm"
          bordered={false}
          size="large"
        >
          <div class="w-[300px] sm:w-[360px]">
            <header class="flex items-center justify-between">
              <div class="w-[70px] h-[70px] overflow-hidden">
                <SystemLogo class="text-[70px]" />
              </div>
              <NGradientText type="primary" size={28}>
                {title}
              </NGradientText>
            </header>
            <main class="pt-6">
              <h3 class="text-[18px] text-primary font-medium">
                {activeModule.value.label}
              </h3>
              <div class="pt-[24px]">
                <Transition mode="out-in" appear name="fade">
                  <tag />
                </Transition>
              </div>
            </main>
          </div>
        </NCard>
      </div>
    );
  }
});
