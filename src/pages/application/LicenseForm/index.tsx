import {
  defineComponent,
  computed,
  reactive,
  onBeforeMount,
  ComputedRef,
  ref,
  Ref,
  watchEffect
} from 'vue';
import { pipe, pick, assoc, omit } from 'ramda';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { NForm, NSelect, NButton, NGrid, NFormItemGi } from 'naive-ui';
import FixedCard from '@/components/custom/FixedCard';
import {
  SignOffComment,
  SignOffRecord,
  ModuleList,
  UploadAttachment,
  SignOffState
} from './components';
import type { FormInst, FormValidationError } from 'naive-ui';
import { useAuthStore, useApiStore, useTabStore } from '@/stores';
import {
  renderExpiredDate,
  renderTestDays,
  renderPerSeat,
  rules,
  FormValue,
  omitFormal,
  omitPOC,
  includeImage,
  OmitPOC,
  OmitFormal,
  UploadImage,
  SuccessResponse,
  ResponseData
} from './utils';
import { useI18n } from '@/hooks';
import { execStrategyActions } from '@/utils';
import {
  postApplicationPOC,
  postApplicationFormal,
  uploadApplicationImage,
  fetchSpecificApplicationForm
} from '@/service/api';

export default defineComponent({
  name: 'LicenseForm',
  setup() {
    const route = useRoute();
    const auth = useAuthStore();
    const apiStore = useApiStore();
    const { removeTab } = useTabStore();
    const { t } = useI18n();

    const formRef: Ref<FormInst | null> = ref(null);
    const formState: Ref<string> = ref('');

    const formValue = reactive<FormValue>({
      SaleId: auth.isAdmin ? null : auth.userInfo.UserId,
      CustomerId: null,
      TestDays: 1,
      PerSeat: 1,
      ExpiredDate: null,
      ApplyModule: [],
      Images: ''
    });

    const formId = computed(() => route.params.id) as ComputedRef<string>;
    const formType = computed(() => route.query.type) as ComputedRef<string>;
    const isCreate = computed(() => !formId.value);
    const needUpload = computed(() => includeImage(formValue));

    onBeforeMount(() => {
      apiStore.fetchList('moduleList');
      apiStore.fetchCustomer();
      apiStore.fetchUsers();
    });

    onBeforeRouteUpdate(async (to, from) => {
      console.log('to', to);
      console.log('from', from);
    });

    watchEffect(() => {
      fetchFormValue(formId.value);
    });

    const customerOptions = computed(() => {
      return apiStore.customerList.Items.map((item: ApiResponse.CustomItem) => {
        return {
          label: item.Customer,
          value: item.CustomerId
        };
      });
    });

    const userOptions = computed(() => {
      return apiStore.userList.map((item: ApiResponse.UserItem) => {
        return {
          value: item.UserId,
          label: item.Name
        };
      });
    });

    async function handleSubmitFormal(formValue: FormValue) {
      const param = omitFormal(formValue);
      const res = await postApplicationFormal<
        OmitFormal<FormValue>,
        SuccessResponse
      >(param);
      return res;
    }

    async function handleSubmitPOC(formValue: FormValue) {
      const param = omitPOC(formValue);
      const res = await postApplicationPOC<OmitPOC<FormValue>, SuccessResponse>(
        param
      );
      return res;
    }

    async function handleSubmitPOCWithImage(formValue: FormValue) {
      const [err, data] = await handleSubmitPOC(formValue);
      if (data) {
        const { ApplicationformId } = data;
        const param = pipe(
          pick(['Images']),
          assoc('ApplicationformId', ApplicationformId)
        )(formValue);
        const res = await uploadApplicationImage<UploadImage, SuccessResponse>(
          param as UploadImage
        );
        return res;
      }
      return [err, data];
    }

    function handleSubmit(e: MouseEvent) {
      e.preventDefault();
      formRef.value?.validate((errors?: Array<FormValidationError>) => {
        if (!errors) {
          const actions: Common.StrategyActions = [
            [
              formType.value === 'Formal',
              async () => {
                const [err, data] = await handleSubmitFormal(formValue);
                if (data) {
                  removeTab(route.fullPath);
                }
              }
            ],
            [
              formType.value === 'POC' && !needUpload.value,
              async () => {
                //
                const [err, data] = await handleSubmitPOC(formValue);
                if (data) {
                  removeTab(route.fullPath);
                }
              }
            ],
            [
              formType.value === 'POC' && needUpload.value,
              async () => {
                const [err, data] = await handleSubmitPOCWithImage(formValue);
                if (data) {
                  removeTab(route.fullPath);
                }
              }
            ]
          ];
          execStrategyActions(actions);
        }
      });
    }

    function handleCancel() {
      removeTab(route.fullPath);
    }

    async function fetchFormValue(id: string) {
      if (!id) return;
      const [err, data] = await fetchSpecificApplicationForm<ResponseData>(
        parseInt(id)
      );
      if (data) {
        handleResponse(data);
      }
    }

    function handleResponse(result: ResponseData) {
      const res = pipe(
        pick(Object.keys(formValue)),
        omit(['Images'])
      )(result.Items);
      Object.assign(formValue, res);
      if (result?.Images) {
        formValue.Images = result.Images;
      }
      formState.value = result.Items.State;
    }

    return () => (
      <FixedCard fixed={false}>
        {{
          default: () => (
            <div class="w-[700px] mx-auto">
              <NForm
                disabled={!isCreate.value}
                ref={formRef}
                class="flex flex-col gap-y-6"
                model={formValue}
                rules={rules}
                label-width="auto"
              >
                <h3 class="text-3xl font-semibold text-center mt-5">
                  {formType.value}申請單
                </h3>
                {/* basic */}
                <div class="p-3 relative border rounded-sm mt-6">
                  <p class="absolute top-[-30px] left-[-1px] px-2 py-1 bg-blue-200">
                    申請單狀態
                  </p>
                  <SignOffState state={formState.value}>
                    {{
                      actions: () => (
                        <NButton round type="error">
                          {t('common.revoke')}
                        </NButton>
                      )
                    }}
                  </SignOffState>
                </div>
                <div class="px-3 pt-5 relative border rounded-sm mt-6">
                  <p class="absolute top-[-30px] left-[-1px] px-2 py-1 bg-blue-200">
                    申請資訊
                  </p>
                  <NGrid cols="2" x-gap={8}>
                    <NFormItemGi path="SaleId" label="申請人">
                      {auth.isAdmin ? (
                        <NSelect
                          options={userOptions.value}
                          placeholder="選擇申請人"
                          tag
                          value={formValue.SaleId}
                          on-update:value={(value: number) => {
                            formValue.SaleId = value;
                          }}
                        ></NSelect>
                      ) : (
                        auth.userInfo.Username
                      )}
                    </NFormItemGi>
                    <NFormItemGi path="CustomerId" label="客戶名稱">
                      <NSelect
                        options={customerOptions.value}
                        placeholder="選擇客戶"
                        filterable
                        tag
                        value={formValue.CustomerId}
                        on-update:value={(value: number) => {
                          formValue.CustomerId = value;
                        }}
                      ></NSelect>
                    </NFormItemGi>
                    {formType.value === 'Formal' && (
                      <NFormItemGi label="授權到期時間" path="ExpiredDate">
                        {renderExpiredDate(formValue)}
                      </NFormItemGi>
                    )}
                    {formType.value === 'POC' && (
                      <>
                        <NFormItemGi label="測試天數" path="TestDays">
                          {renderTestDays(formValue)}
                        </NFormItemGi>
                        <NFormItemGi label="測試用量" path="PerSeat">
                          {renderPerSeat(formValue)}
                        </NFormItemGi>
                      </>
                    )}
                  </NGrid>
                  <ModuleList
                    type={formType.value}
                    list={apiStore.moduleList}
                    value={formValue.ApplyModule}
                    defaultExpiredDate={formValue.ExpiredDate}
                    onUpdate:value={(value) => {
                      formValue.ApplyModule = value;
                    }}
                  ></ModuleList>
                </div>
                {/* upload */}
                {needUpload.value && (
                  <UploadAttachment
                    class="mt-6"
                    value={formValue.Images}
                    defaultValue={formValue.Images}
                    onUpdate:value={(images) => {
                      formValue.Images = images;
                    }}
                  ></UploadAttachment>
                )}
                {isCreate.value && (
                  <div class="flex items-center justify-around">
                    <NButton round type="primary" onClick={handleSubmit}>
                      {t('common.submit')}
                    </NButton>
                    <NButton round onClick={handleCancel}>
                      {t('common.cancel')}
                    </NButton>
                  </div>
                )}
              </NForm>
              {!isCreate.value && <SignOffComment />}
              {!isCreate.value && <SignOffRecord />}
            </div>
          )
        }}
      </FixedCard>
    );
  }
});
