import {
  defineComponent,
  h,
  computed,
  reactive,
  PropType,
  ref,
  Ref
} from 'vue';
import {
  NCard,
  NList,
  NListItem,
  NDropdown,
  DropdownOption,
  NButton,
  NInput,
  NForm,
  NFormItem,
  FormInst,
  FormValidationError
} from 'naive-ui';
import { useRenderIcon } from '@/composables';
import { useAuthStore } from '@/stores';
import { execStrategyActions } from '@/utils';
import { rules } from './utils';
import { useSwal } from '@/hooks';
import { modCustomer, delCustomer } from '@/service/api';

export interface Customer extends ApiResponse.CustomItem {
  _loading?: boolean;
}

export default defineComponent({
  name: 'CustomerCard',
  emits: ['update:value', 'delete', 'cancel'],
  props: {
    value: {
      type: Object as PropType<Customer>,
      default: () => ({})
    },
    ...NCard.props
  },
  setup(props, { emit }) {
    const auth = useAuthStore();
    const { createErrorSwal } = useSwal();

    const formValue = reactive(
      Object.assign({ Customer: '', CustomerId: 0, CRMUrl: '' }, props.value)
    );
    const isNew = ref(!formValue.CustomerId);
    const isEdit = ref(isNew.value);
    const formRef: Ref<FormInst | null> = ref(null);

    const options = computed<DropdownOption[]>(() => [
      {
        label: '編輯',
        key: 'edit',
        icon: useRenderIcon({ icon: 'mdi:pencil' }),
        show: !isEdit.value
      },
      {
        label: '移除',
        key: 'remove',
        icon: useRenderIcon({ icon: 'mdi:trash-can-outline' }),
        disabled: !auth.isAdmin
      }
    ]);

    function renderCardHeader(data: Customer) {
      return isEdit.value ? (
        <NFormItem class="w-full" path="Customer">
          <NInput
            default-value={data.Customer}
            placeholder="請輸入客戶名稱"
            on-update:value={(value: string) => {
              data.Customer = value.trim();
            }}
          ></NInput>
        </NFormItem>
      ) : (
        <p class="h-[36px] align-middle leading-[36px]">{data.Customer}</p>
      );
    }

    function renderURL(data: Customer) {
      return isEdit.value ? (
        <NFormItem path="CRMUrl">
          <NInput
            size="small"
            default-value={data.CRMUrl}
            placeholder="請輸入 CRM URL"
            on-update:value={(value: string) => {
              data.CRMUrl = value.trim();
            }}
          ></NInput>
        </NFormItem>
      ) : (
        h(
          'a',
          {
            href: data.CRMUrl,
            target: '_blank',
            class: 'h-[32px] align-middle leading-[32px]'
          },
          '開啟 CRM 連結'
        )
      );
    }

    type Callback = (error?: Array<FormValidationError>) => void;
    function handleValidate(callback: Callback) {
      formRef.value?.validate(callback);
    }

    function handleSelect(type: string) {
      const actions: Common.StrategyActions = [
        [
          type === 'edit',
          () => {
            isEdit.value = true;
          }
        ],
        [
          type === 'save' && !isNew.value,
          () => {
            handleValidate(async (error) => {
              if (!error) {
                const [err, data] = await modCustomer<
                  Omit<Customer, '_loading'>,
                  ApiResponse.Success
                >(formValue);
                if (data) {
                  emit('update:value', formValue);
                  isEdit.value = false;
                }
              }
            });
          }
        ],
        [
          type === 'save' && isNew.value,
          () => {
            handleValidate((error) => {
              if (!error) {
                emit('update:value', formValue);
              }
            });
          }
        ],
        [
          type === 'cancel' && !isNew.value,
          () => {
            isEdit.value = false;
            Object.assign(formValue, props.value);
          }
        ],
        [
          type === 'cancel' && isNew.value,
          () => {
            emit('cancel');
          }
        ],
        [
          type === 'remove',
          () => {
            createErrorSwal({
              title: `是否要移除客戶：${formValue.Customer}`,
              text: '移除此客戶會同步移除與此客戶相關聯的表單!',
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText: '確定',
              cancelButtonText: '取消'
            }).then(async ({ isConfirmed }) => {
              if (isConfirmed) {
                const [err, data] = await delCustomer(formValue.CustomerId);
                data && emit('delete');
              }
            });
          }
        ]
      ];
      execStrategyActions(actions);
    }

    function renderActions() {
      return isEdit.value ? (
        <>
          <NButton
            bordered={false}
            quaternary={false}
            size="small"
            onClick={() => handleSelect('save')}
          >
            {{ icon: useRenderIcon({ icon: 'mdi:content-save' }) }}
          </NButton>
          <NButton
            bordered={false}
            quaternary={false}
            size="small"
            onClick={() => handleSelect('cancel')}
          >
            {{ icon: useRenderIcon({ icon: 'mdi:cancel' }) }}
          </NButton>
        </>
      ) : (
        <NDropdown
          trigger="click"
          options={options.value}
          on-select={handleSelect}
        >
          <NButton size="small" bordered={false} quaternary={false}>
            {{
              icon: useRenderIcon({
                icon: 'mdi:dots-horizontal',
                fontSize: '16px'
              })
            }}
          </NButton>
        </NDropdown>
      );
    }

    function renderContent(item: Customer) {
      return h(NList, {}, () => [
        h(
          NListItem,
          {
            class: '!py-1'
          },
          {
            default: () => renderURL(item),
            prefix: useRenderIcon({ icon: 'mdi:web' })
          }
        )
      ]);
    }

    return () => (
      <NForm
        ref={formRef}
        show-feedback={false}
        show-label={false}
        rules={rules}
        model={formValue}
      >
        <NCard {...props} size="small">
          {{
            header: () => renderCardHeader(formValue),
            'header-extra': renderActions,
            default: () => renderContent(formValue)
          }}
        </NCard>
      </NForm>
    );
  }
});
