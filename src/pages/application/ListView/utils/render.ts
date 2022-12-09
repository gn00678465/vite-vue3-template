import { h, VNodeChild } from 'vue';
import { NTag } from 'naive-ui';
import { EnumApplicationFormState } from '@/enum';
import type { ApplicationTableData } from './columns';
import { execStrategyActions } from '@/utils';

type TagPropType = InstanceType<typeof NTag>['$props']['type'];

const renderTag = (type: TagPropType, content: string) =>
  h(NTag, { type, round: true }, () => content);

export function renderState(rowData: ApplicationTableData) {
  return rowData.State === 'Cancel' || rowData.State === 'Reject'
    ? renderTag('error', EnumApplicationFormState[rowData.State])
    : rowData.State === 'ManagerCheck' || rowData.State === 'FinalCheck'
    ? renderTag('info', EnumApplicationFormState[rowData.State])
    : renderTag('success', EnumApplicationFormState[rowData.State]);
}

export function renderExpand(rowData: ApplicationTableData) {
  let result: null | VNodeChild = null;
  const actions: Common.StrategyActions = [
    [
      rowData.Type === 'POC' || rowData.Type === 'FunctionModule',
      () => {
        result = h('div', [h('p', rowData.PerSeat), h('p', rowData.TestDays)]);
      }
    ],
    [
      rowData.Type === 'Formal',
      () => {
        result = h('div', [h('p', rowData.ExpiredDate)]);
      }
    ]
  ];

  execStrategyActions(actions);

  return result;
}
