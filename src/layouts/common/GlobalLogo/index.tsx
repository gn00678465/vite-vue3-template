import { defineComponent, computed } from 'vue';
import SystemLogo from '@/components/common/SystemLogo.vue';
import { useAppInfo } from '@/composables';
import { useAppStore } from '@/stores';
import { useI18n } from '@/hooks';

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
    const app = useAppStore();
    const { t } = useI18n();

    const titleVisible = computed<boolean>(() => {
      return props.showTitle && !app.menuCollapse;
    });
    return () => (
      <router-link
        to={{ name: 'root' }}
        class="flex items-center justify-center whitespace-nowrap overflow-hidden"
      >
        <SystemLogo class="text-[24px]" />
        {titleVisible.value && (
          <h2 class="pl-2 text-base font-bold text-primary transition duration-300 ease-in-out">
            {t(title)}
          </h2>
        )}
      </router-link>
    );
  }
});
