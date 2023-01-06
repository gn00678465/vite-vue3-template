import { defineComponent } from 'vue';
import { NButton, NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { Types } from '../../utils';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'CreateButton',
  emits: ['on-select'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const options: DropdownOption[] = [
      {
        label: '正式申請單',
        key: 'Formal'
      },
      {
        label: 'POC 申請單',
        key: 'POC'
      }
    ];

    function handleSelect(key: string | number) {
      emit('on-select', key as Types);
    }

    return () => (
      <NDropdown trigger="click" options={options} on-select={handleSelect}>
        {{
          default: () => (
            <NButton type="primary">
              {{
                icon: () => <Icon icon="mdi:plus" />,
                default: () => <p>{t('operate.createNew.form')}</p>
              }}
            </NButton>
          )
        }}
      </NDropdown>
    );
  }
});
