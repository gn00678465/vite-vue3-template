import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AboutComponent',
  setup() {
    const title = ref('About');

    return () => <h1>{title.value}</h1>;
  }
});
