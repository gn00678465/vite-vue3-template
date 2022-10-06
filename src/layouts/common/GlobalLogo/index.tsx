import { defineComponent } from 'vue';
import SystemLogo from '@/components/common/SystemLogo.vue';

export default defineComponent({
  name: 'GlobalLogo',
  setup() {
    return () => (
      <router-link
        to="/login"
        class="flex items-center justify-center whitespace-nowrap overflow-hidden"
      >
        <SystemLogo class="text-[40px]" />
        <h2 class="pl-2 text-base font-bold text-primary transition duration-300 ease-in-out">
          Title
        </h2>
      </router-link>
    );
  }
});
