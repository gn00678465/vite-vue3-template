import {
  defineComponent,
  ref,
  Ref,
  onBeforeMount,
  unref,
  computed,
  PropType,
  toRefs
} from 'vue';
import { omit } from 'ramda';
import FixedCard, { FixedCardSlots } from '@/components/custom/FixedCard';
import { LoadingEmptyWrapper } from '@/components/business';
import { NPagination, NGrid, NGi, NButton, NModal, NInput } from 'naive-ui';
import { CustomerCard, Customer } from './components';
import { useRenderIcon, usePagination } from '@/composables';
import { fetchCustomerList, setCustomer } from '@/service/api';
import { MaybeRef } from '@vueuse/core';
import { useApiStore } from '@/stores';

type Responsive = InstanceType<typeof NGrid>['$props']['responsive'];

export default defineComponent({
  name: 'CustomerList',
  props: {
    responsive: {
      type: String as PropType<Responsive>,
      default: 'screen'
    }
  },
  setup(props) {
    const apiStore = useApiStore();
    const dataBase: Ref<Customer[]> = ref([]);
    const total = ref(0);
    const modalShow = ref(false);
    const searchValue = ref('');

    const { responsive } = toRefs(props);

    const filterData = computed(() => {
      return dataBase.value.filter(handleFilter(searchValue));
    });

    onBeforeMount(() => {
      fetchCustomerData(0, 0);
    });

    const {
      currentPage,
      currentPageSize,
      onPageUpdate,
      opPageSizeUpdate,
      currentData,
      loading,
      loadingStart,
      loadingEnd
    } = usePagination<Customer>(filterData, {
      total,
      page: 1,
      pageSize: 20
    });

    function handleFilter(
      filter: MaybeRef<string>
    ): (arg: ApiResponse.CustomItem) => boolean {
      const re = new RegExp(unref(filter), 'i');
      return (item) => re.test(item.Customer);
    }

    async function fetchCustomerData(
      from: MaybeRef<number> = 0,
      size: MaybeRef<number> = 0
    ) {
      loadingStart();
      const [err, data] = await fetchCustomerList<
        ApiResponse.CommonData<Customer>
      >(unref(from), unref(size));
      if (data) {
        total.value = data.Total;
        dataBase.value = data.Items || [];
      }
      loadingEnd();
    }

    type SetParam = Omit<Customer, 'CustomerId' | '_loading'>;
    async function setNewCustomer(formValue: Customer) {
      const [err, data] = await setCustomer<SetParam, Service.ResponseSuccess>(
        omit(['CustomerId'], formValue)
      );
      if (data) {
        modalShow.value = false;
        fetchCustomerData(0, 0);
      }
    }

    return () => (
      <FixedCard fixed={true} class="relative">
        {{
          default: ({ contentHeight }: FixedCardSlots) => (
            <LoadingEmptyWrapper
              loading={loading.value}
              empty={!filterData.value.length}
              height={contentHeight.value}
            >
              <div class="flex items-center justify-between sticky top-0 z-20 bg-white dark:bg-[#18181c]">
                <NInput
                  autosize
                  class="w-[300px]"
                  value={searchValue.value}
                  placeholder="請輸入篩選條件"
                  on-update:value={(value: string) => {
                    searchValue.value = value;
                  }}
                >
                  {{ prefix: useRenderIcon({ icon: 'mdi:magnify' }) }}
                </NInput>
                <NButton
                  type="primary"
                  onClick={() => {
                    modalShow.value = true;
                  }}
                >
                  {{
                    icon: useRenderIcon({ icon: 'mdi:add' }),
                    default: () => '新增客戶'
                  }}
                </NButton>
              </div>
              <NGrid
                responsive={responsive.value}
                cols="1 m:2 l:3 xl:4"
                x-gap="8"
                y-gap="8"
                class="mt-3 mb-8 z-10"
              >
                {currentData.value.map((item, index) => (
                  <NGi key={item.CustomerId}>
                    <CustomerCard
                      value={item}
                      onUpdate:value={(value: Customer) => {
                        dataBase.value.splice(index, 1, value);
                        apiStore.fetchCustomer(0, 0, { reload: true });
                      }}
                      onDelete={() => {
                        fetchCustomerData(0, 0);
                      }}
                    />
                  </NGi>
                ))}
              </NGrid>
              <div class="absolute bottom-0 w-full flex justify-end">
                <NPagination
                  class="mr-5"
                  page={currentPage.value}
                  page-size={currentPageSize.value}
                  item-count={total.value}
                  page-sizes={[10, 20, 30, 40]}
                  show-size-picker
                  size="small"
                  on-update:page={onPageUpdate}
                  on-update:page-size={opPageSizeUpdate}
                ></NPagination>
              </div>
              <NModal
                class="w-[400px]"
                show={modalShow.value}
                bordered={false}
                title="新增客戶"
                preset="card"
                content-style={{ padding: '0px' }}
                mask-closable={false}
                on-update:show={(value: boolean) => {
                  modalShow.value = value;
                }}
              >
                <CustomerCard
                  bordered={false}
                  onUpdate:value={setNewCustomer}
                  onCancel={() => {
                    modalShow.value = false;
                  }}
                />
              </NModal>
            </LoadingEmptyWrapper>
          )
        }}
      </FixedCard>
    );
  }
});
