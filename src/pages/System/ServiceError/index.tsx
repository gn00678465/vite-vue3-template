import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServiceError',
  setup() {
    return () => <div>500</div>;
  }
});
