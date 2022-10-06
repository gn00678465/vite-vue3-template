import { defineComponent } from 'vue';
import { NScrollbar, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';

export default defineComponent({
  name: 'VerticalMenu',
  setup() {
    return () => (
      <NScrollbar>
        <NMenu></NMenu>
      </NScrollbar>
    );
  }
});
