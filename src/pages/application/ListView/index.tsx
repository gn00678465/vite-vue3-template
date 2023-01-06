import { defineComponent, ref, onBeforeMount, h, watch, reactive } from 'vue';
import type { Ref, VNodeChild } from 'vue';
import FixedCard from '@/components/custom/FixedCard';
import type { FixedCardSlots } from '@/components/custom/FixedCard';
import { NDataTable, NButton, NPopover, NTag } from 'naive-ui';
import type { DataTableFilterState } from 'naive-ui';
import { CreateButton, CustomerFilter } from './components';
import { useResizeObserver } from '@vueuse/core';
import { useAPTerm } from '@/utils';
import {
  createColumns,
  useApplicationFormFetch,
  useApplicationFormRoute,
  ApplicationTableData,
  ApplyModule,
  fetchApi
} from './utils';
import { useRenderIcon, useRouterPush } from '@/composables';
import {
  useFetchPagination,
  useDataTableDefProps
} from '@/composables/dataTable';
import { useI18n } from 'vue-i18n';
import { useApiStore } from '@/stores';
import { EnumFunctionModule } from '@/enum';

export default defineComponent({
  name: 'ApplicationFormListView',
  setup() {
    const { t } = useI18n();
    const apiStore = useApiStore();
    const { routerPush } = useRouterPush(true);
    const { pushCreateForm, pushSelectForm } =
      useApplicationFormRoute(routerPush);
    // view
    const banner: Ref<null | HTMLElement> = ref(null);
    const bannerHeight: Ref<number> = ref(0);

    // filter
    const filterValue = reactive<{
      State: null | string;
      Customer: null | number;
    }>({ State: null, Customer: null });

    const total: Ref<number> = ref(0);
    const database: Ref<ApplicationTableData[]> = ref([]);

    useResizeObserver(banner, (entries) => {
      const entry = entries[0];
      const { height } = entry.contentRect;
      bannerHeight.value = height + 8;
    });

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
      pageSize: 20,
      onPageChange: fetchData,
      onPageSizeChange: fetchData
    });

    async function fetchData({
      currentPage,
      currentPageSize
    }: {
      currentPage: number;
      currentPageSize: number;
    }) {
      loadingStart();
      const [err, data] = await fetchApi.value<
        ApiResponse.CommonData<ApplicationTableData>
      >(useAPTerm(currentPage, currentPageSize).value, currentPageSize);
      if (data) {
        total.value = data.Total || 0;
        database.value = (data.Items as ApplicationTableData[]) || [];
      }
      if (err) {
        console.log('ApplicationFormListView', err);
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

    function renderIndex(index: number): number {
      return useAPTerm(currentPage, currentPageSize).value + index + 1;
    }

    function renderSale(rowData: ApplicationTableData): VNodeChild {
      return apiStore.userListMap.get(rowData.SaleId)?.Name;
    }

    function renderModule(rowData: ApplicationTableData): VNodeChild {
      const tags = rowData.ApplyModule?.map((item: ApplyModule) => {
        return h(
          NTag,
          {
            type: 'default',
            size: 'small'
          },
          {
            default: () =>
              t(
                `components.licenseForm.modules.${
                  EnumFunctionModule[item.Module]
                }`
              )
          }
        );
      });
      return h('div', { class: 'flex flex-wrap gap-[6px]' }, tags);
    }

    function renderCustomer(rowData: ApplicationTableData) {
      return apiStore.customerList.ListMap.get(rowData.CustomerId)?.Customer;
    }

    function renderAction(rowData: ApplicationTableData): VNodeChild {
      return h('div', { class: 'flex justify-center items-center gap-x-1' }, [
        h(
          NButton,
          {
            size: 'small',
            onClick: () => {
              pushSelectForm(rowData.Type, {
                params: { id: rowData.ApplicationFormId }
              });
            }
          },
          () => t('common.detail')
        ),
        h(
          NPopover,
          { trigger: 'click', placement: 'left' },
          {
            trigger: () =>
              h(
                NButton,
                { size: 'small', quaternary: true },
                useRenderIcon({ icon: 'mdi:dots-horizontal' })
              ),
            default: () =>
              h('div', { class: 'flex flex-col gap-y-1 items-center' }, [
                h(
                  NButton,
                  {
                    size: 'small',
                    onClick: () => {
                      window.open(rowData.CRMUrl, '_blank');
                    }
                  },
                  () => '開啟 CRM 連結'
                ),
                rowData.Type === 'Formal' &&
                  rowData.State === 'Finish' &&
                  h(
                    NButton,
                    {
                      size: 'small',
                      onClick: () => {
                        pushCreateForm('FunctionModule', {
                          query: { formalId: rowData.ApplicationFormId }
                        });
                      }
                    },
                    () => '申請模組試用單'
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
              <div ref={banner} class="flex flex-items justify-end gap-x-2">
                <CustomerFilter
                  value={filterValue.Customer}
                  onUpdate:value={(value: number) => {
                    filterValue.State = null;
                    filterValue.Customer = value;
                    useApplicationFormFetch(filterValue);
                  }}
                />
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
                  renderSale,
                  renderCustomer,
                  renderAction,
                  renderModule
                })}
                pagination={usePaginationReactive({
                  itemCount: total.value,
                  page: currentPage.value,
                  pageSize: currentPageSize.value
                })}
                on-update:page={onPageUpdate}
                on-update:page-size={opPageSizeUpdate}
                on-update:filters={(filters: DataTableFilterState) => {
                  filterValue.Customer = null;
                  Object.assign(filterValue, filters);
                  useApplicationFormFetch(filterValue);
                }}
              ></NDataTable>
            </div>
          )
        }}
      </FixedCard>
    );
  }
});
