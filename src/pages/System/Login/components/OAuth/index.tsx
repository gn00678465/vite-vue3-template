import { defineComponent } from 'vue';
import { Windows } from './components';

export default defineComponent({
  name: 'OAuth',
  setup() {
    return () => (
      <div>
        <Windows></Windows>
      </div>
    );
  }
});
