import { defineComponent } from 'vue';
import ExceptionBase from '@/components/common/ExceptionBase.vue';

export default defineComponent({
  name: 'ServiceError',
  setup() {
    return () => <ExceptionBase type={500} />;
  }
});
