import { defineComponent } from 'vue';
import { VerticalSider } from './components';

export default defineComponent({
  name: 'GlobalSider',
  setup() {
    return () => (
      <div class="p-3">
        <VerticalSider></VerticalSider>
      </div>
    );
  }
});
