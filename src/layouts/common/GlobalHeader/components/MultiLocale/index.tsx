import { defineComponent, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
import HoverContainer from '@/components/common/HoverContainer.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'MultiLocale',
  setup() {
    const { locale } = useI18n();

    const options = computed<DropdownOption[]>(() => [
      {
        label: '繁體中文',
        key: 'zh-TW',
        disabled: locale.value === 'zh-TW',
        props: {
          onClick() {
            locale.value = 'zh-TW';
          }
        }
      },
      {
        label: 'English',
        key: 'en-US',
        disabled: locale.value === 'en-US',
        props: {
          onClick() {
            locale.value = 'en-US';
          }
        }
      }
    ]);

    return () => (
      <NDropdown options={options.value}>
        <HoverContainer class="w-[40px] h-full">
          <Icon icon="mdi:translate" width="18" height="18"></Icon>
        </HoverContainer>
      </NDropdown>
    );
  }
});
