import { defineComponent, ref, Ref, computed, PropType } from 'vue';
import { NSelect, SelectOption, NDivider } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores';
import { useNotification } from '@/hooks';
import { useI18n } from 'vue-i18n';
import { messages } from '../../../locales';

type Column = '' | 'Role' | 'Department';

export default defineComponent({
  name: 'EditField',
  emits: ['update:value'],
  props: {
    value: {
      type: Number,
      default: 0
    },
    options: {
      type: Array as PropType<ApiResponse.CommonItem[]>,
      default: () => []
    },
    currentUser: {
      type: Boolean,
      default: false
    },
    column: {
      type: String as PropType<Column>,
      default: ''
    }
  },
  setup(props, ctx) {
    const isEdit: Ref<boolean> = ref(false);
    const selectValue: Ref<number> = ref(props.value);
    const validation: Ref<'success' | 'warning' | 'error' | undefined> =
      ref(undefined);

    const { t } = useI18n();
    const { t: tl } = useI18n({ messages });
    const { createErrorNotify } = useNotification({
      duration: 1500
    });

    const auth = useAuthStore();

    const enableEdit = computed(() => {
      return auth.isAdmin && !(props.currentUser && props.column === 'Role');
    });

    const notSet: SelectOption = {
      value: 0,
      label: t('common.notSet'),
      disabled: true
    };

    const opts = computed<SelectOption[]>(() => [
      notSet,
      ...props.options.map((item) => {
        return {
          label: tl(`${props.column}.${item.Name}`),
          value: item.ID
        };
      })
    ]);

    const label = computed(() => {
      return props.options.find((item) => {
        return item.ID === props.value;
      })?.Name;
    });

    function toggleEdit() {
      isEdit.value = !isEdit.value;
    }

    function handleSave() {
      if (selectValue.value === 0) {
        validation.value = 'error';
        createErrorNotify({
          title: 'Error',
          content: 'Can not use not set.'
        });
      } else {
        validation.value = 'success';
        ctx.emit('update:value', { value: selectValue.value, isEdit });
      }
    }

    function handleCancel() {
      selectValue.value = props.value;
      validation.value = undefined;
      toggleEdit();
    }

    return () => (
      <div>
        {!isEdit.value ? (
          <div class="flex w-full items-center justify-between">
            {(label.value && tl(`${props.column}.${label.value}`)) ||
              t('common.notSet')}
            {enableEdit.value && (
              <Icon
                class="cursor-pointer text-base opacity-70 transition-all hover:text-blue-500 hover:opacity-100"
                inline
                icon="mdi:pencil"
                onClick={toggleEdit}
              />
            )}
          </div>
        ) : (
          <div class="flex w-full items-center justify-between">
            <NSelect
              class="w-4/5"
              size="small"
              options={opts.value}
              status={validation.value}
              value={selectValue.value}
              on-update:value={(value: number) => {
                selectValue.value = value;
              }}
            ></NSelect>
            <div class="flex items-center">
              <Icon
                class="cursor-pointer hover:text-blue-500 transition-colors text-base"
                inline
                icon="mdi:content-save"
                onClick={handleSave}
              />
              <NDivider vertical />
              <Icon
                class="cursor-pointer hover:text-blue-500 transition-colors text-base"
                inline
                icon="mdi:close-thick"
                onClick={handleCancel}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
});
