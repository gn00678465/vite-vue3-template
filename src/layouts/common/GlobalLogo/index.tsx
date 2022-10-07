import { defineComponent } from 'vue';
import SystemLogo from '@/components/common/SystemLogo.vue';
import { useAppInfo } from '@/composables';

export default defineComponent({
  name: 'GlobalLogo',
  props: {
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { title } = useAppInfo();
    return () => (
      <router-link
        to="/login"
        class="flex items-center justify-center whitespace-nowrap overflow-hidden"
      >
        <SystemLogo class="text-[25px]" />
        {props.showTitle && (
          <h2 class="pl-2 text-base font-bold text-primary transition duration-300 ease-in-out">
            {title}
          </h2>
        )}
      </router-link>
    );
  }
});
