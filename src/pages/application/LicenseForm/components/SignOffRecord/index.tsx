import {
  defineComponent,
  ref,
  computed,
  toRefs,
  watchEffect,
  onBeforeUnmount
} from 'vue';
import { NCollapseTransition, NTimeline, NTimelineItem } from 'naive-ui';
import { pipe, curry, assoc } from 'ramda';
import { utcToZonedTime, format } from 'date-fns-tz';
import { fetchSpecificFormRecord } from '@/service/api';
import { useI18n } from '@/hooks';
import { messages } from '../../../locales';

enum EnumState {
  'Cancel' = 'Cancel',
  'Reject' = 'Reject',
  'ManagerCheck' = 'ManagerCheck',
  'FinalCheck' = 'FinalCheck',
  'Finish(WaitingForSerial)' = 'CreateSerial'
}

type StateType = InstanceType<typeof NTimelineItem>['$props']['type'];
interface FormState {
  CreateTime: string;
  State: string;
  Name?: string;
  Type?: StateType;
  Reason?: string;
}
interface FormRecord {
  ApplicationformID: number;
  State: FormState[];
}

export default defineComponent({
  name: 'SignOffRecord',
  inheritAttrs: false,
  props: {
    ApplicationFormId: {
      type: Number,
      default: 0
    },
    creator: {
      type: String,
      default: null
    },
    CreateTime: {
      type: String,
      default: null
    },
    State: {
      type: String,
      default: null
    }
  },
  setup(props, { attrs }) {
    const show = ref(true);
    const record = ref<FormState[]>([]);
    const { ApplicationFormId, CreateTime, creator, State } = toRefs(props);
    const { t } = useI18n({
      messages: messages
    });

    const isSigned = computed(() => !!record.value.length);

    const setName = curry(function (attrs: any, item: FormState) {
      const state = EnumState[item.State as keyof typeof EnumState];
      if (state in attrs || `${item.State}` in attrs) {
        return assoc('Name', attrs[state])(item);
      }
      return item;
    });

    const setType = (item: FormState): FormState => {
      const type: StateType =
        item.State === 'Cancel' || item.State === 'Reject'
          ? 'error'
          : item.State === 'Finish'
          ? 'success'
          : 'info';

      return assoc('Type', type)(item);
    };

    const setReason = curry(function (attrs: any, item: FormState) {
      if (`${item.State}Reason` in attrs) {
        return assoc('Reason', attrs[`${item.State}Reason`])(item);
      }
      return item;
    });

    async function fetchFormRecord(id: number) {
      if (!id) return;
      const [err, data] = await fetchSpecificFormRecord<FormRecord>(id);
      if (data?.State) {
        record.value = data?.State.map(
          pipe(setName(attrs), setReason(attrs), setType)
        );
      }
    }

    const stop = watchEffect(() => {
      fetchFormRecord(ApplicationFormId.value);
    });

    onBeforeUnmount(() => {
      stop();
    });

    return () => (
      <NCollapseTransition show={show.value} class="px-2 py-4">
        <NTimeline>
          <NTimelineItem
            type={isSigned.value ? 'info' : 'default'}
            time={
              CreateTime?.value &&
              format(
                utcToZonedTime(CreateTime.value, 'Asia/Taipei'),
                'yyyy-MM-dd HH:mm:ss'
              )
            }
          >
            {{
              header: () => (
                <p>
                  {t('Create')}：{creator.value}
                </p>
              )
            }}
          </NTimelineItem>
          {record.value.map((item) => (
            <NTimelineItem
              key={item.State}
              time={format(
                utcToZonedTime(item.CreateTime, 'Asia/Taipei'),
                'yyyy-MM-dd HH:mm:ss'
              )}
              type={item.Type}
            >
              {{
                header: () => (
                  <p>
                    {t(item.State, 2)}：{item.Name}
                  </p>
                ),
                default: () => item.Reason
              }}
            </NTimelineItem>
          ))}
        </NTimeline>
      </NCollapseTransition>
    );
  }
});
