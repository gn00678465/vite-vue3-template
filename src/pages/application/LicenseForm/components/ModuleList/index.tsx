import { defineComponent, PropType, computed, watch, reactive, ref } from 'vue';
import {
  NFormItem,
  NFormItemGi,
  NCheckboxGroup,
  NCheckbox,
  NGrid,
  NGi,
  NDatePicker
} from 'naive-ui';
import { ApplyModule, dateToUtcString, dateToUTCTime } from '../../utils';
import { execStrategyActions } from '@/utils';
import { watchOnce } from '@vueuse/core';

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
    }
  },
  setup(props, { emit }) {
    const moduleDate = ref<Map<number, number>>(new Map([]));

    const module = computed<number[]>(() =>
      props.value.map((item) => item.Module)
    );
    const expiredDate = computed<number>(
      () => dateToUTCTime(props.defaultExpiredDate) as number
    );

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
      if (props.type === 'Formal' && !props.defaultExpiredDate) {
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
          props.type === 'Formal',
          () => {
            emit('update:value', handleFormalModule(arr, map));
          }
        ],
        [
          props.type === 'POC',
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
          Date: dateToUtcString(map.get(item) as number)
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
      () => props.value,
      (newValue) => {
        handleDefaultValue(newValue);
      }
    );

    return () => (
      <NFormItem path="ApplyModule" label="模組" required {...formItemStatus}>
        <NCheckboxGroup
          value={module.value}
          class="w-full"
          on-update:value={handleUpdateModule}
        >
          <NGrid cols={2} y-gap={4} x-gap={8}>
            {props.list.map((item: ApiResponse.CommonItem) => {
              return (
                <NGi
                  key={item.ID}
                  class="flex items-center justify-between h-[30px]"
                >
                  <NCheckbox value={item.ID} label={item.Name} />
                  {module.value.includes(item.ID) &&
                    props.type === 'Formal' && (
                      <NFormItemGi show-feedback={false} show-label={false}>
                        <NDatePicker
                          class="w-[140px]"
                          size="small"
                          placeholder="設定到期時間"
                          value={moduleDate.value.get(item.ID)}
                          isDateDisabled={(ts: number) => {
                            return expiredDate.value < ts;
                          }}
                          on-update:value={(value: number) => {
                            moduleDate.value.set(item.ID, value);
                            handleEmit(module.value, moduleDate.value);
                          }}
                        ></NDatePicker>
                      </NFormItemGi>
                    )}
                </NGi>
              );
            })}
          </NGrid>
        </NCheckboxGroup>
      </NFormItem>
    );
  }
});
