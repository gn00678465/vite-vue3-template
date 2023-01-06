import {
  defineComponent,
  computed,
  ref,
  unref,
  toRefs,
  watch,
  PropType
} from 'vue';
import { MaybeRef } from '@vueuse/core';
import {
  NButton,
  NInput,
  NPopconfirm,
  NRadioGroup,
  NRadio,
  NPagination
} from 'naive-ui';
import { useRenderIcon, usePagination } from '@/composables';
import { useApiStore } from '@/stores';
import { LoadingEmptyWrapper } from '@/components/business';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'CustomerFilter',
  emits: ['update:value'],
  props: {
    value: {
      type: [Number, null] as PropType<number | null>,
      default: null
    }
  },
  setup(props, { emit }) {
    const apiStore = useApiStore();
    const { t } = useI18n();

    const filterString = ref('');
    const total = computed(() => apiStore.customerList.Total);
    const data = computed(() =>
      apiStore.customerList.Items.filter(handleFilter(filterString))
    );
    const pageSize = ref(10);
    //
    const checked = ref<number | null>(null);
    const { value } = toRefs(props);

    watch(value, (value) => {
      checked.value = value;
    });

    const { currentPage, onPageUpdate, currentData, loading } =
      usePagination<ApiResponse.CustomItem>(data, {
        total,
        page: 1,
        pageSize
      });

    function handleFilter(
      filter: MaybeRef<string>
    ): (arg: ApiResponse.CustomItem) => boolean {
      const re = new RegExp(unref(filter), 'i');
      return (item) => re.test(item.Customer);
    }

    function handleUpdateValue(value: MaybeRef<number | null> | null) {
      emit('update:value', unref(value));
    }

    function renderPagination() {
      return (
        <div class="flex justify-end">
          <NPagination
            size="small"
            page-slot={1}
            page={currentPage.value}
            item-count={total.value}
            page-size={pageSize.value}
            on-update:page={onPageUpdate}
          ></NPagination>
        </div>
      );
    }

    return () => (
      <NPopconfirm
        showIcon={false}
        placement="bottom"
        positive-text={t('common.filter')}
        negative-text={t('common.reset')}
        positive-button-props={{
          disabled: !checked.value
        }}
        on-positive-click={() => {
          handleUpdateValue(checked);
        }}
        on-negative-click={() => {
          handleUpdateValue(null);
        }}
      >
        {{
          activator: () => (
            <NButton type="info" secondary>
              {{
                icon: useRenderIcon({ icon: 'mdi:filter-variant' }),
                default: () => t('operate.filterBy.customer')
              }}
            </NButton>
          ),
          default: () => (
            <div class="flex flex-col gap-y-2">
              <NInput
                size="small"
                value={filterString.value}
                on-update:value={(value: string) => {
                  filterString.value = value;
                }}
              ></NInput>
              {renderPagination()}
              <LoadingEmptyWrapper
                height={160}
                loading={loading.value}
                empty={!data.value.length}
                iconClass="text-[130px] text-primary"
              >
                <NRadioGroup
                  value={checked.value}
                  class="flex flex-col gap-y-1"
                  on-update:value={(value: number) => {
                    checked.value = value;
                  }}
                >
                  {currentData.value.map((item) => (
                    <NRadio
                      key={item.CustomerId}
                      label={item.Customer}
                      name={item.CustomerId + ''}
                      value={item.CustomerId}
                    ></NRadio>
                  ))}
                </NRadioGroup>
              </LoadingEmptyWrapper>
            </div>
          )
        }}
      </NPopconfirm>
    );
  }
});
