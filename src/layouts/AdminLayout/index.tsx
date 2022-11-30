import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
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

    const collapsedWidth: Ref<number> = ref(64);
    return () => (
      <BasicLayout
        collapsed-width={collapsedWidth.value}
        width={240}
        collapsed={app.menuCollapse}
        showTab={true}
        showFooter={true}
      >
        {{
          sider: () => (
            <GlobalSider collapsedWidth={collapsedWidth.value}></GlobalSider>
          ),
          header: () => <GlobalHeader></GlobalHeader>,
          content: () => <GlobalContent></GlobalContent>
        }}
      </BasicLayout>
    );
  }
});
