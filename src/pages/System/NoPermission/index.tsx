import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NoPermission',
  setup() {
    return () => <div>403</div>;
  }
});
