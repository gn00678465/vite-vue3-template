import { defineComponent } from 'vue';
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
      <div class="h-full flex items-center justify-between border-b dark:border-[#101014]">
        <div class="h-full flex items-center gap-x-1">
          <MenuCollapse />
          <GlobalBreadcrumb />
        </div>
        <div class="h-full flex items-center">
          <ThemeMode />
          <MultiLocale />
          <FullScreen />
          <UserAvatar />
        </div>
      </div>
    );
  }
});
