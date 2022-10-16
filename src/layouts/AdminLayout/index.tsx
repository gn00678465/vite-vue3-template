import { defineComponent } from 'vue';
import {
  BasicLayout,
  GlobalContent,
  GlobalHeader,
  GlobalSider
} from '../common';
import { useAppStore } from '@/stores';

export default defineComponent({
  name: 'AdminLayout',
  setup() {
    const app = useAppStore();
    return () => (
      <BasicLayout
        collapsed-width={64}
        width={240}
        collapsed={app.menuCollapse}
        showTab={false}
        showFooter={false}
      >
        {{
          sider: () => <GlobalSider></GlobalSider>,
          header: () => <GlobalHeader></GlobalHeader>,
          content: () => <GlobalContent></GlobalContent>,
          tab: () => <div class="px-3 py-2">tab</div>,
          footer: () => <div class="px-3 py-2">footer</div>
        }}
      </BasicLayout>
    );
  }
});
