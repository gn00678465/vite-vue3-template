import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GlobalContent',
  setup() {
    return () => (
      <div>
        <router-view />
      </div>
    );
  }
});
