import { defineComponent, ref } from 'vue';
import { NCard } from 'naive-ui';
import {
  GlobalBreadcrumb,
  MenuCollapse,
  ThemeMode,
  FullScreen,
  UserAvatar,
  MultiLocale
} from './components';

export default defineComponent({
  name: 'GlobalHeader',
  setup() {
    return () => (
      <NCard bordered={false} size="small">
        {{
          default: () => (
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-2">
                <MenuCollapse />
                <GlobalBreadcrumb />
              </div>
              <div class="flex items-center gap-x-2">
                <ThemeMode />
                <MultiLocale />
                <FullScreen />
                <UserAvatar />
              </div>
            </div>
          )
        }}
      </NCard>
    );
  }
});
