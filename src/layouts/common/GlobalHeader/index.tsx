import { defineComponent } from 'vue';
import { NCard } from 'naive-ui';
import { useRoute } from 'vue-router';
import { GlobalBreadcrumb } from './components';

export default defineComponent({
  name: 'GlobalHeader',
  setup() {
    return () => (
      <NCard bordered={false}>
        <GlobalBreadcrumb />
      </NCard>
    );
  }
});
