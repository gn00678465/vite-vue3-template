import { defineComponent } from 'vue';
import { NButton, NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
import { Icon } from '@iconify/vue';
import {
  useFetchTableData,
  FetchParams,
  useDataTableDefProps
} from '@/composables/dataTable';
import { Types } from '../../utils';

export default defineComponent({
  name: 'CreateButton',
  emits: ['on-select'],
  setup(props, { emit }) {
    const options: DropdownOption[] = [
      {
        label: '正式申請單',
        key: 'Formal'
      },
      {
        label: 'POC 申請單',
        key: 'POC'
      },
      {
        label: '功能模組申請單',
        key: 'FunctionModule'
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
                default: () => <p>新建申請單</p>
              }}
            </NButton>
          )
        }}
      </NDropdown>
    );
  }
});
