import { defineComponent } from 'vue';
import ExceptionBase from '@/components/common/ExceptionBase.vue';

export default defineComponent({
  name: 'NotFound',
  setup() {
    return () => <ExceptionBase type={404} />;
  }
});
