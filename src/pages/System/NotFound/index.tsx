import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
  setup() {
    return () => <div>404</div>;
  }
});
