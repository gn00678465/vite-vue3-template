import {
  defineComponent,
  ref,
  onBeforeMount,
  h,
  watch,
  computed,
  Fragment
} from 'vue';
import type { Ref, VNodeChild } from 'vue';
import FixedCard from '@/components/custom/FixedCard';
import type { FixedCardSlots } from '@/components/custom/FixedCard';
import { NDataTable, NButton, NPopover } from 'naive-ui';
import type { DataTableFilterState } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { CreateButton } from './components';
import { useResizeObserver } from '@vueuse/core';
import { useAPTerm } from '@/utils';
import {
  createColumns,
  ApplicationTableData,
  useApplicationFormFetch,
  useApplicationFormRoute
} from './utils';
import { useRouterPush } from '@/composables';
import {
  useFetchTableData,
  FetchParams,
  useDataTableDefProps
} from '@/composables/datatable';
import { useI18n } from '@/hooks';
import { useApiStore } from '@/stores';

export default defineComponent({
  name: 'ApplicationFormListView',
  setup(props, ctx) {
    const { t } = useI18n();
    const apiStore = useApiStore();
    const { routerPush } = useRouterPush(true);
    const { pushCreateForm, pushSelectForm, appendRoute } =
      useApplicationFormRoute(routerPush);
    //
    const banner: Ref<null | HTMLElement> = ref(null);
    const bannerHeight: Ref<number> = ref(0);

    const stateFilter: Ref<DataTableFilterState | null> = ref(null);
    const { fetchApi } = useApplicationFormFetch(stateFilter);

    const total: Ref<number> = ref(0);
    const database: Ref<ApplicationTableData[]> = ref([]);

    useResizeObserver(banner, (entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      bannerHeight.value = height + 8;
    });

    const { currentPage, currentPageSize, loading, loadingStart, loadingEnd } =
      useFetchTableData(fetchData, total);

    async function fetchData({ currentPage, currentPageSize }: FetchParams) {
      loadingStart();
      const [err, data] = await fetchApi.value<
        ApiResponse.CommonData<ApplicationTableData>
      >(useAPTerm(currentPage, currentPageSize).value, currentPageSize);
      if (data) {
        total.value = data.Total;
        database.value = data.Items as ApplicationTableData[];
      }
      if (data === null) {
        total.value = 0;
        database.value = [];
      }
      if (err) {
        console.log(err);
      }
      loadingEnd();
    }

    watch(fetchApi, () => {
      currentPage.value = 1;
      fetchData({
        currentPage: currentPage.value,
        currentPageSize: currentPageSize.value
      });
    });

    onBeforeMount(() => {
      Promise.all([
        fetchData({
          currentPage: currentPage.value,
          currentPageSize: currentPageSize.value
        }),
        apiStore.fetchCustomer(),
        apiStore.fetchUsers()
      ]);
    });

    const { useDataTableReactive, usePaginationReactive } =
      useDataTableDefProps();

    const customerFilterOptions = computed(() => {
      return apiStore.customerList.Items.map((item) => ({
        value: item.CustomerId,
        label: item.Customer
      }));
    });

    function renderIndex(index: number): number {
      return useAPTerm(currentPage, currentPageSize).value + index + 1;
    }

    function renderAction(
      rowData: ApplicationTableData,
      index: number
    ): VNodeChild {
      return h('div', { class: 'flex justify-center items-center gap-x-1' }, [
        h(
          NButton,
          {
            size: 'small',
            onClick: () => {
              pushSelectForm({
                params: { id: rowData.ApplicationFormId },
                query: { type: rowData.Type }
              });
            }
          },
          () => t('common.view')
        ),
        h(
          NPopover,
          { trigger: 'click', placement: 'left' },
          {
            trigger: () =>
              h(NButton, { size: 'small' }, () =>
                h(Icon, { icon: 'mdi:dots-vertical' })
              ),
            default: () =>
              h(Fragment, [
                h(
                  NButton,
                  {
                    size: 'small',
                    onClick: () => {
                      console.log(rowData.CRMUrl);
                    }
                  },
                  () => 'CRM'
                )
              ])
          }
        )
      ]);
    }

    return () => (
      <FixedCard fixed={true}>
        {{
          default: ({ contentHeight }: FixedCardSlots) => (
            <div class="flex flex-col gap-y-2">
              <div ref={banner} class="flex flex-items justify-end">
                <CreateButton on-select={pushCreateForm} />
              </div>
              <NDataTable
                style={`height: ${contentHeight.value - bannerHeight.value}px`}
                {...useDataTableReactive({
                  loading: loading.value,
                  data: database.value
                })}
                rowKey={(rowData: ApplicationTableData) =>
                  rowData.ApplicationFormId
                }
                columns={createColumns({
                  renderIndex,
                  renderAction,
                  customerFilterOptions: customerFilterOptions.value
                })}
                pagination={usePaginationReactive({
                  itemCount: total.value,
                  page: currentPage.value,
                  pageSize: currentPageSize.value
                })}
                on-update:page={(page: number) => {
                  currentPage.value = page;
                }}
                on-update:page-size={(size: number) => {
                  currentPageSize.value = size;
                }}
                on-update:filters={(filters: DataTableFilterState) => {
                  stateFilter.value = filters;
                }}
              ></NDataTable>
            </div>
          )
        }}
      </FixedCard>
    );
  }
});
