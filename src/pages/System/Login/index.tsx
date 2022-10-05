import { defineComponent, ref, computed, Transition } from 'vue';
import type { Component } from 'vue';
import { EnumLoginModules } from '@/enum';
import { useAppInfo } from '@/composables';
import { NCard, NGradientText } from 'naive-ui';
import { PwdLogin } from './components';

interface LoginModule {
  key: EnumType.LoginModuleKey;
  label: EnumLoginModules;
  component: Component;
}

export default defineComponent({
  name: 'LoginPage',
  setup(props, ctx) {
    const { title } = useAppInfo();

    const modules: LoginModule[] = [
      {
        key: 'pwd-login',
        label: EnumLoginModules['pwd-login'],
        component: PwdLogin
      }
    ];

    const activeModule = computed(() => {
      const active: LoginModule = { ...modules[0] };
      return active;
    });

    const tag: Component = activeModule.value.component;

    return () => (
      <div class="relative, flex items-center justify-center w-full h-full">
        <NCard
          class="w-auto rounded-[20px] shadow-sm"
          bordered={false}
          size="large"
        >
          <div class="w-[300px] sm:w-[360px]">
            <header class="flex items-center justify-between">
              <div>Logo</div>
              <NGradientText type="primary" size={28}>
                {title}
              </NGradientText>
            </header>
            <main class="pt-[24px]">
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
