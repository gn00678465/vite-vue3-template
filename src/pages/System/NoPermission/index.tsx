import { defineComponent } from 'vue';
import ExceptionBase from '@/components/common/ExceptionBase.vue';

export default defineComponent({
  name: 'NoPermission',
  setup() {
    return () => <ExceptionBase type={403} />;
  }
});
