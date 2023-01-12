import {
  defineComponent,
  computed,
  reactive,
  onBeforeMount,
  ref,
  toRefs,
  Ref,
  watchEffect
} from 'vue';
import { pipe, pick, assoc, omit, prop } from 'ramda';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useMachine } from '@xstate/vue';
import {
  NForm,
  NSelect,
  NButton,
  NGrid,
  NFormItemGi,
  NInputNumber,
  NDatePicker
} from 'naive-ui';
import FixedCard from '@/components/custom/FixedCard';
import {
  SignOffComment,
  SignOffRecord,
  ModuleList,
  UploadAttachment,
  SignOffState,
  HeaderWrap,
  SerialNumber,
  POCReason,
  POCExplanation
} from './components';
import type { FormInst, FormValidationError } from 'naive-ui';
import { useAuthStore, useApiStore, useTabStore } from '@/stores';
import {
  rules,
  FormValue,
  includeImage,
  ResponseData,
  initStateMachine,
  SIGN_OFF_STATES,
  omitPOC,
  ApplyModule,
  endOfUTCString,
  dateToUTCTime
} from './utils';
import {
  useNotification,
  useSwal,
  useLoading,
  useImmerReactive
} from '@/hooks';
import { execStrategyActions } from '@/utils';
import { fetchSpecificApplicationForm } from '@/service/api';
import { useI18n } from 'vue-i18n';
import { EnumLicenseFormType } from '@/enum';

type FormType = keyof typeof EnumLicenseFormType;

export default defineComponent({
  name: 'LicenseForm',
  props: {
    formType: {
      type: String,
      default: ''
    },
    formId: {
      type: String,
      default: undefined
    },
    formalId: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const route = useRoute();
    const auth = useAuthStore();
    const apiStore = useApiStore();
    const { removeTab } = useTabStore();
    const { t } = useI18n();
    const { state, send } = useMachine(initStateMachine);
    const { createErrorNotify, createSuccessNotify } = useNotification({
      duration: 1500
    });
    const { createWarningSwal } = useSwal();
    const { loading, loadingStart, loadingEnd } = useLoading(false);

    const formRef: Ref<FormInst | null> = ref(null);
    const formState: Ref<string> = ref('');

    const [formValue, updateFormValue] = useImmerReactive<FormValue>({
      SaleId: auth.isAdmin ? null : auth.userInfo.UserId,
      CustomerId: null,
      TestDays: 1,
      PerSeat: 1,
      ExpiredDate: null,
      WarrantyExpired: null,
      ApplyModule: [],
      Images: ''
    });

    function handleUpdateFormValue<T>(key: keyof FormValue, value: T) {
      updateFormValue((draft) => {
        (draft[key] as unknown) = value;
      });
    }

    const { formType, formId, formalId } = toRefs(props);
    const needUpload = computed(() => includeImage(formValue));
    const creator = computed(
      () =>
        apiStore.userListMap.get(formValue.SaleId as number)?.Name ||
        '申請人不存在'
    );

    const isCreate = computed(() => state.value.matches('Create'));
    const isSelf = computed(() => formValue.SaleId === auth.userInfo.UserId);
    // type
    const isFormal = computed(() => formType.value === 'Formal');
    const isPOC = computed(() => formType.value === 'POC');
    const isModule = computed(() => formType.value === 'FunctionModule');
    // state
    const isDone = computed(() => state.value.done);
    const isApproval = computed(
      () =>
        !isCreate.value &&
        (state.value.matches(SIGN_OFF_STATES.ManagerCheck) ||
          state.value.matches(SIGN_OFF_STATES.FinalCheck))
    );
    const isSerialNumber = computed(() =>
      state.value.matches(SIGN_OFF_STATES.Finish_WaitingForSerial)
    );
    const canRevoke = computed(
      () => isApproval.value && (isSelf.value || auth.isAdmin)
    );

    // 不在 formValue 內的資料
    const extraFormData = reactive({});
    const functionalModule = ref<ApplyModule[]>([]);

    onBeforeMount(() => {
      apiStore.fetchList('moduleList');
      apiStore.fetchCustomer();
      apiStore.fetchUsers();
    });

    onBeforeRouteUpdate((to, from) => {
      if (to !== from) return false;
      if (to.params.type !== from.params.type) return false;
    });

    watchEffect(() => {
      formId?.value && fetchFormValue(parseInt(formId.value));
    });

    watchEffect(
      () => {
        !isDone.value &&
          send({
            type: 'UPDATE_CONTEXT',
            value: { state: formState.value }
          });
      },
      { flush: 'post' }
    );

    watchEffect(() => {
      formalId?.value && fetchFormValue(parseInt(formalId.value));
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
      return apiStore.userList
        .filter((item) => {
          return item.Department === 1 || item.Department === 2;
        })
        .map((item: ApiResponse.UserItem) => {
          return {
            value: item.UserId,
            label: item.Name
          };
        });
    });

    function showMessage(
      title?: string
    ): (arg: Service.ResponseSuccess | Service.ResponseError) => void {
      return (res) => {
        res.Status === 'Error'
          ? createErrorNotify({ title: '發生錯誤', description: res.Message })
          : createSuccessNotify({ title });
      };
    }

    function handleCancel() {
      removeTab(route.fullPath);
    }

    function handleSubmit(e: MouseEvent) {
      e.preventDefault();
      formRef.value?.validate((errors?: Array<FormValidationError>) => {
        if (!errors) {
          const actions: Common.StrategyActions = [
            [
              isFormal.value,
              () => {
                send({
                  type: 'SubmitFormal',
                  param: formValue,
                  actions: {
                    close: handleCancel
                  }
                });
              }
            ],
            [
              isPOC.value && !needUpload.value,
              () => {
                send({
                  type: 'SubmitPOC',
                  param: omitPOC(formValue),
                  actions: {
                    close: handleCancel
                  }
                });
              }
            ],
            [
              isPOC.value && needUpload.value,
              () => {
                send({
                  type: 'SubmitPOC',
                  param: formValue,
                  actions: {
                    close: handleCancel
                  }
                });
              }
            ],
            [
              isModule.value,
              () => {
                send({
                  type: 'SubmitModule',
                  param: formValue,
                  actions: {
                    close: handleCancel
                  }
                });
              }
            ]
          ];
          execStrategyActions(actions);
        }
      });
    }

    function handleRevoke() {
      createWarningSwal({
        title: '撤回此申請單?',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          send({
            type: 'Cancel',
            param: parseInt(formId.value as string),
            actions: {
              close: handleCancel,
              showMessage: showMessage('已撤回表單!')
            }
          });
        }
      });
    }

    function handleApproval() {
      send({
        type: 'Next',
        param: parseInt(formId.value as string),
        actions: { close: handleCancel }
      });
    }

    function handleReject(comment: string) {
      send({
        type: 'Reject',
        param: pipe(
          assoc('ApplicationformId', parseInt(formId.value as string)),
          assoc('Reason', comment)
        )({}),
        actions: {
          close: handleCancel,
          showMessage: showMessage('已駁回表單!')
        }
      });
    }

    function handleGenerateSN() {
      send({
        type: 'Next',
        param: parseInt(formId.value as string),
        actions: { close: handleCancel }
      });
    }

    async function fetchFormValue(id: number) {
      if (!id) return;
      loadingStart();
      const [err, data] = await fetchSpecificApplicationForm<ResponseData>(id);
      if (data) {
        const actions: Common.StrategyActions = [
          [
            !isModule.value || !formalId?.value,
            () => {
              handleAllResponse(data);
              Object.assign(
                extraFormData,
                omit(Object.keys(formValue))(data.Items)
              );
            }
          ],
          [
            isModule.value && !!formalId?.value,
            () => {
              handleSomeResponse(data);
            }
          ]
        ];

        execStrategyActions(actions);
      }
      if (err) {
        handleCancel();
      }
      loadingEnd();
    }

    function handleAllResponse(result: ResponseData) {
      const res = pipe(
        pick(Object.keys(formValue)),
        omit(['Images'])
      )(result.Items);
      updateFormValue((draft) => {
        Object.assign(draft, res);
        if (result?.Images) {
          draft.Images = result.Images;
        }
      });
      formState.value = result.Items.State;
    }

    function handleSomeResponse(result: ResponseData) {
      const res = pipe(pick(['CustomerId']), omit(['Images']))(result.Items);
      Object.assign(formValue, res);
      functionalModule.value = prop('ApplyModule')(result.Items);
    }

    return () => (
      <FixedCard fixed={false}>
        {{
          default: () => (
            <div class="w-[700px] mx-auto">
              <NForm
                disabled={!isCreate.value}
                ref={formRef}
                class="flex flex-col"
                model={formValue}
                rules={rules}
                label-width="auto"
              >
                <h3 class="text-3xl font-semibold text-center mt-5">
                  {t(EnumLicenseFormType[formType.value as FormType])}申請單
                </h3>
                {/* basic */}
                {!isCreate.value && (
                  <HeaderWrap title="申請單狀態">
                    <SignOffState state={formState.value}>
                      {{
                        actions: () =>
                          canRevoke.value && (
                            <NButton round type="error" onClick={handleRevoke}>
                              {t('common.present.revoke')}
                            </NButton>
                          )
                      }}
                    </SignOffState>
                  </HeaderWrap>
                )}
                <HeaderWrap title="申請資訊">
                  <NGrid cols="2" x-gap={8}>
                    <NFormItemGi path="SaleId" label="申請人">
                      {auth.isAdmin ? (
                        <NSelect
                          options={userOptions.value}
                          placeholder="選擇申請人"
                          tag
                          value={formValue.SaleId}
                          on-update:value={(value: number) => {
                            handleUpdateFormValue<number>('SaleId', value);
                          }}
                        ></NSelect>
                      ) : (
                        creator.value
                      )}
                    </NFormItemGi>
                    <NFormItemGi path="CustomerId" label="客戶名稱">
                      <NSelect
                        options={customerOptions.value}
                        placeholder="選擇客戶"
                        filterable
                        value={formValue.CustomerId}
                        disabled={!isCreate.value || isModule.value}
                        on-update:value={(value: number) => {
                          handleUpdateFormValue<number>('CustomerId', value);
                        }}
                      ></NSelect>
                    </NFormItemGi>
                    {isFormal.value && (
                      <>
                        <NFormItemGi label="授權到期時間" path="ExpiredDate">
                          <NDatePicker
                            class="w-full"
                            type="date"
                            placeholder="請選擇授權到期時間"
                            value={dateToUTCTime(formValue.ExpiredDate)}
                            isDateDisabled={(ts: number) => {
                              return ts < Date.now() - 87200000;
                            }}
                            on-update:value={(value: number) => {
                              handleUpdateFormValue<string>(
                                'ExpiredDate',
                                endOfUTCString(value)
                              );
                            }}
                          />
                        </NFormItemGi>
                        <NFormItemGi
                          label="保固到期時間"
                          path="WarrantyExpired"
                        >
                          <NDatePicker
                            class="w-full"
                            type="date"
                            placeholder="請選擇保固到期時間"
                            value={dateToUTCTime(formValue.WarrantyExpired)}
                            isDateDisabled={(ts: number) => {
                              return ts < Date.now() - 87200000;
                            }}
                            on-update:value={(value: number) => {
                              handleUpdateFormValue<string>(
                                'WarrantyExpired',
                                endOfUTCString(value)
                              );
                            }}
                          />
                        </NFormItemGi>
                      </>
                    )}
                    {(isPOC.value || isModule.value) && (
                      <>
                        <NFormItemGi label="測試天數" path="TestDays">
                          <NInputNumber
                            class="w-full"
                            min={1}
                            max={90}
                            buttonPlacement="both"
                            defaultValue={formValue.TestDays}
                            value={formValue.TestDays}
                            on-update:value={(value: number) => {
                              handleUpdateFormValue<number>('TestDays', value);
                              // formValue.TestDays = value;
                            }}
                          />
                        </NFormItemGi>
                        <NFormItemGi label="測試用量" path="PerSeat">
                          <NInputNumber
                            class="w-full"
                            min={1}
                            buttonPlacement="both"
                            defaultValue={formValue.PerSeat}
                            value={formValue.PerSeat}
                            on-update:value={(value: number) => {
                              handleUpdateFormValue<number>('PerSeat', value);
                              // formValue.PerSeat = value;
                            }}
                          />
                        </NFormItemGi>
                      </>
                    )}
                  </NGrid>
                  <ModuleList
                    type={formType.value}
                    list={apiStore.moduleList}
                    value={formValue.ApplyModule}
                    defaultExpiredDate={formValue.ExpiredDate}
                    disabledModule={functionalModule.value}
                    onUpdate:value={(value) => {
                      handleUpdateFormValue<ApplyModule[]>(
                        'ApplyModule',
                        value
                      );
                    }}
                  ></ModuleList>
                </HeaderWrap>
                {/* upload */}
                {needUpload.value && (
                  <>
                    <HeaderWrap
                      title="說明"
                      describe="測試天數大於45天或測試用量大於30U，必須填寫下列欄位。"
                    >
                      <POCExplanation></POCExplanation>
                      <POCReason />
                    </HeaderWrap>
                    <HeaderWrap
                      title="上傳附件"
                      describe="測試天數大於45天或測試用量大於30U，必須掃描並上傳申請單。"
                    >
                      <UploadAttachment
                        value={formValue.Images}
                        defaultValue={formValue.Images}
                        onUpdate:value={(images: string) => {
                          handleUpdateFormValue<string>('Images', images);
                        }}
                      ></UploadAttachment>
                    </HeaderWrap>
                  </>
                )}
                {isCreate.value && (
                  <div class="flex items-center justify-around">
                    <NButton round type="primary" onClick={handleSubmit}>
                      {t('common.submit')}
                    </NButton>
                    <NButton round onClick={handleCancel}>
                      {t('common.present.cancel')}
                    </NButton>
                  </div>
                )}
              </NForm>
              {isApproval.value && (
                <HeaderWrap title="簽核">
                  <SignOffComment
                    onApproval={handleApproval}
                    onReject={handleReject}
                    onCancel={handleCancel}
                  />
                </HeaderWrap>
              )}
              {(isSerialNumber.value || isDone.value) && (
                <HeaderWrap title="序號">
                  {{
                    default: () => <SerialNumber></SerialNumber>,
                    extra: () => (
                      <NButton
                        size="small"
                        type="primary"
                        onClick={handleGenerateSN}
                      >
                        產生序號
                      </NButton>
                    )
                  }}
                </HeaderWrap>
              )}
              {!isCreate.value && (
                <HeaderWrap title="簽核紀錄">
                  <SignOffRecord creator={creator.value} {...extraFormData} />
                </HeaderWrap>
              )}
            </div>
          )
        }}
      </FixedCard>
    );
  }
});
