import {
  defineComponent,
  ref,
  Ref,
  onBeforeMount,
  unref,
  watch,
  PropType,
  toRefs
} from 'vue';
import { omit } from 'ramda';
import FixedCard, { FixedCardSlots } from '@/components/custom/FixedCard';
import { LoadingEmptyWrapper } from '@/components/business';
import { NPagination, NGrid, NGi, NButton, NModal, NInput } from 'naive-ui';
import { CustomerCard, Customer } from './components';
import { useRenderIcon } from '@/composables';
import { useFetchPagination } from '@/composables/dataTable';
import { fetchCustomerList, setCustomer } from '@/service/api';
import { useApiStore } from '@/stores';
import { useAPTerm } from '@/utils';
import { refDebounced } from '@vueuse/core';

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
    const debounced = refDebounced(searchValue, 300);

    const { responsive } = toRefs(props);

    const {
      currentPage,
      currentPageSize,
      loading,
      loadingStart,
      loadingEnd,
      onPageUpdate,
      opPageSizeUpdate
    } = useFetchPagination({
      total,
      pageSize: 20
    });

    onBeforeMount(() => {
      fetchCustomerData({ From: 0, Size: currentPageSize.value });
    });

    type CustomerRequest = ApiRequest.CustomerRequest;
    watch(
      [currentPage, currentPageSize, debounced],
      (newArr, oldArr, onCleanup) => {
        const controller = new AbortController();
        const keys: Array<keyof CustomerRequest> = ['From', 'Size', 'Filter'];
        fetchCustomerData<ApiRequest.CustomerRequest>(
          handleParam(keys, newArr),
          controller
        );
        onCleanup(() => {
          controller.abort();
        });
      }
    );

    function handleParam(
      keys: Array<keyof CustomerRequest>,
      arr: [number, number, string | undefined]
    ) {
      return keys.reduce<CustomerRequest>((obj, item, index) => {
        if (item === 'From') {
          obj[item] = unref(useAPTerm(arr[0] as number, arr[1] as number));
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          obj[item] = arr[index];
        }
        return obj;
      }, {} as CustomerRequest);
    }

    async function fetchCustomerData<T>(
      param: T,
      controller?: AbortController
    ) {
      loadingStart();
      const [err, data] = await fetchCustomerList<
        T,
        ApiResponse.CommonData<Customer>
      >(param, { signal: controller?.signal });
      if (data) {
        total.value = data.Total || 0;
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
        // fetchCustomerData(0, 0);
      }
    }

    return () => (
      <FixedCard fixed={true} class="relative">
        {{
          default: ({ contentHeight }: FixedCardSlots) => (
            <LoadingEmptyWrapper
              loading={loading.value}
              empty={!dataBase.value.length}
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
                {dataBase.value.map((item, index) => (
                  <NGi key={item.CustomerId}>
                    <CustomerCard
                      value={item}
                      onUpdate:value={(value: Customer) => {
                        dataBase.value.splice(index, 1, value);
                        apiStore.fetchCustomer({}, { reload: true });
                      }}
                      onDelete={() => {
                        // fetchCustomerData(0, 0);
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
