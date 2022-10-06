import { defineComponent } from 'vue';
import {
  BasicLayout,
  GlobalContent,
  GlobalHeader,
  GlobalSider
} from '../common';

export default defineComponent({
  name: 'AdminLayout',
  setup() {
    return () => (
      <BasicLayout siderVisible={true}>
        {{
          sider: () => <GlobalSider></GlobalSider>,
          header: () => <GlobalHeader></GlobalHeader>,
          content: () => <GlobalContent></GlobalContent>
        }}
      </BasicLayout>
    );
  }
});
