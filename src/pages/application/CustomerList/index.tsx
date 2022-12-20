import { defineComponent, ref, Ref, watchEffect } from 'vue';
import { omit } from 'ramda';
import FixedCard, { FixedCardSlots } from '@/components/custom/FixedCard';
import { NPagination, NGrid, NGi, NButton, NModal } from 'naive-ui';
import { CustomerCard, Customer } from './components';
import { useRenderIcon } from '@/composables';
import { fetchCustomerList, setCustomer } from '@/service/api';
import { useOffsetPagination } from '@vueuse/core';
import { useAPTerm } from '@/utils';

export default defineComponent({
  name: 'CustomerList',
  setup() {
    const dataBase: Ref<Customer[]> = ref([]);
    const total = ref(0);
    const modalShow = ref(false);

    const { currentPage, currentPageSize } = useOffsetPagination({
      total: total.value,
      page: 1,
      pageSize: 20
    });

    watchEffect(() => {
      fetchCustomDate();
    });

    async function fetchCustomDate() {
      const [err, data] = await fetchCustomerList<
        ApiResponse.CommonData<Customer>
      >(useAPTerm(currentPage, currentPageSize).value, currentPageSize.value);
      if (data) {
        total.value = data.Total;
        dataBase.value = data.Items || [];
      }
    }

    type SetParam = Omit<Customer, 'CustomerId' | '_loading'>;
    async function setNewCustomer(formValue: Customer) {
      const [err, data] = await setCustomer<SetParam, ApiResponse.Success>(
        omit(['CustomerId'], formValue)
      );
      if (data) {
        modalShow.value = false;
        fetchCustomDate();
      }
    }

    return () => (
      <FixedCard fixed={true} class="relative">
        <div class="flex items-center justify-end absolute top-0 left-0 right-0">
          {/* <NInput></NInput> */}
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
          responsive="screen"
          cols="1 m:2 l:3 xl:4"
          x-gap="8"
          y-gap="8"
          class="pt-[46px]"
        >
          {dataBase.value.map((item, index) => (
            <NGi key={item.CustomerId}>
              <CustomerCard
                value={item}
                onUpdate:value={(value: Customer) => {
                  dataBase.value.splice(index, 1, value);
                }}
                onDelete={() => {
                  fetchCustomDate();
                }}
              />
            </NGi>
          ))}
        </NGrid>
        <NPagination
          class="absolute bottom-0 right-5"
          page={currentPage.value}
          page-size={currentPageSize.value}
          item-count={total.value}
          page-sizes={[10, 20, 30, 40]}
          show-size-picker
          size="small"
          on-update:page={(value: number) => {
            currentPage.value = value;
          }}
          on-update:page-size={(value: number) => {
            currentPageSize.value = value;
          }}
        ></NPagination>
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
      </FixedCard>
    );
  }
});
