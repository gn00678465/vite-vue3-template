import {
  defineComponent,
  PropType,
  computed,
  watch,
  reactive,
  ref,
  toRefs,
  unref
} from 'vue';
import {
  NFormItem,
  NFormItemGi,
  NCheckboxGroup,
  NCheckbox,
  NGrid,
  NGi,
  NDatePicker
} from 'naive-ui';
import { ApplyModule, endOfUTCString, dateToUTCTime } from '../../utils';
import { execStrategyActions } from '@/utils';
import { watchOnce, MaybeRef } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

type ValidationStatus = InstanceType<
  typeof NFormItem
>['$props']['validationStatus'];

export default defineComponent({
  name: 'ModuleList',
  emits: ['update:value'],
  props: {
    type: {
      type: String,
      default: ''
    },
    list: {
      type: Array as PropType<ApiResponse.CommonItem[]>,
      default: () => []
    },
    value: {
      type: Array as PropType<ApplyModule[]>,
      default: () => []
    },
    defaultExpiredDate: {
      type: String as PropType<string | null>,
      default: null
    },
    disabledModule: {
      type: Array as PropType<ApplyModule[]>,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const moduleDate = ref<Map<number, number>>(new Map([]));
    const { value, defaultExpiredDate, list, type, disabledModule } =
      toRefs(props);

    const module = computed<number[]>(() =>
      value.value.map((item) => item.Module)
    );
    const expiredDate = computed<number>(
      () => dateToUTCTime(defaultExpiredDate.value) as number
    );
    const isFormal = computed(() => type.value === 'Formal');
    const isPOC = computed(() => type.value === 'POC');
    const isModule = computed(() => type.value === 'FunctionModule');
    interface FormItemStatus {
      validationStatus?: ValidationStatus;
      feedback?: string;
      setStatus: (arg1?: ValidationStatus, arg2?: string) => void;
      resetStatus: () => void;
    }
    // 驗證的狀態
    const formItemStatus = reactive<FormItemStatus>({
      validationStatus: undefined,
      feedback: undefined,
      setStatus(status, message) {
        this.validationStatus = status;
        this.feedback = message;
      },
      resetStatus() {
        this.setStatus();
      }
    });

    function handleUpdateModule(
      value: number[],
      { actionType, value: actionValue }: { actionType: string; value: number }
    ) {
      if (isFormal.value && !defaultExpiredDate.value) {
        formItemStatus.setStatus('error', '請先選擇到期時間');
        return;
      }
      if (actionType === 'check') {
        moduleDate.value.set(actionValue, expiredDate.value);
      }
      if (actionType === 'uncheck' && moduleDate.value.has(actionValue)) {
        moduleDate.value.delete(actionValue);
      }
      formItemStatus.resetStatus();
      handleEmit(value, moduleDate.value);
    }

    // emit value
    function handleEmit(arr: number[], map: Map<number, number>) {
      const actions: Common.StrategyActions = [
        [
          isFormal.value,
          () => {
            emit('update:value', handleFormalModule(arr, map));
          }
        ],
        [
          isPOC.value,
          () => {
            emit('update:value', handlePOClModule(arr));
          }
        ],
        [
          isModule.value,
          () => {
            emit('update:value', handlePOClModule(arr));
          }
        ]
      ];
      execStrategyActions(actions);
    }

    function handleFormalModule(
      arr: number[],
      map: Map<number, number>
    ): ApplyModule[] {
      return arr.map((item) => {
        return {
          Module: item,
          Date: endOfUTCString(map.get(item) as number)
        };
      });
    }

    function handlePOClModule(arr: number[]): ApplyModule[] {
      return arr.map((item) => {
        return {
          Module: item
        };
      });
    }

    // 到期日變更執行
    function setNewExpiredDate(date: number) {
      moduleDate.value.forEach((value, key, map) => {
        if (value > date) {
          map.set(key, date);
        }
      });
    }

    watch(expiredDate, setNewExpiredDate);

    // default value
    function handleDefaultValue(value: ApplyModule[]) {
      if (!value.length) return;
      value.forEach((item) => {
        if (item?.Date) {
          moduleDate.value.set(item.Module, dateToUTCTime(item.Date) as number);
        }
      });
    }

    watchOnce(
      () => value.value,
      (newValue) => {
        handleDefaultValue(newValue);
      },
      {
        immediate: true
      }
    );

    // function module
    const disabledModuleValue = computed<number[]>(() =>
      disabledModule.value.map((item) => item.Module)
    );

    type List = MaybeRef<ApiResponse.CommonItem[]>;
    type FilterCB = (arg: ApiResponse.CommonItem) => boolean;
    function filterList(list: List, cb: FilterCB) {
      return unref(list).filter(cb);
    }

    function renderModules(list: List) {
      return unref(list).map((item) => (
        <NGi key={item.ID} class="flex items-center justify-between h-[30px]">
          <NCheckbox
            size="large"
            value={item.ID}
            label={t(`components.licenseForm.modules.${item.Name}`)}
          />
          {module.value.includes(item.ID) && isFormal.value && (
            <NFormItemGi show-feedback={false} show-label={false}>
              <NDatePicker
                class="w-[140px]"
                size="small"
                placeholder="設定到期時間"
                value={moduleDate.value.get(item.ID)}
                isDateDisabled={(ts: number) => {
                  return expiredDate.value < ts || ts < Date.now() - 87200000;
                }}
                on-update:value={(value: number) => {
                  moduleDate.value.set(item.ID, value);
                  handleEmit(module.value, moduleDate.value);
                }}
              ></NDatePicker>
            </NFormItemGi>
          )}
        </NGi>
      ));
    }

    function renderExistModule(list: ApiResponse.CommonItem[]) {
      return list.map((item) => (
        <NGi key={item.ID}>
          <NCheckbox
            size="large"
            value={item.ID}
            label={t(`components.licenseForm.modules.${item.Name}`)}
          />
        </NGi>
      ));
    }

    return () => (
      <>
        {isModule.value && !value.value.length && (
          <NFormItem
            class="mb-2"
            label="正式單已申請模組"
            show-feedback={false}
          >
            <NCheckboxGroup
              class="w-full"
              value={disabledModuleValue.value}
              disabled={true}
            >
              <NGrid cols={2} y-gap={4} x-gap={8}>
                {renderExistModule(
                  filterList(list, (item) =>
                    disabledModuleValue.value.includes(item.ID)
                  )
                )}
              </NGrid>
            </NCheckboxGroup>
          </NFormItem>
        )}
        <NFormItem path="ApplyModule" label="模組" required {...formItemStatus}>
          <NCheckboxGroup
            class="w-full"
            value={module.value}
            on-update:value={handleUpdateModule}
          >
            <NGrid cols={2} y-gap={4} x-gap={8}>
              {!isModule.value
                ? renderModules(list)
                : renderModules(
                    filterList(
                      list,
                      (item) => !disabledModuleValue.value.includes(item.ID)
                    )
                  )}
            </NGrid>
          </NCheckboxGroup>
        </NFormItem>
      </>
    );
  }
});
