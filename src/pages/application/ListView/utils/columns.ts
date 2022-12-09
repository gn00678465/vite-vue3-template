import { h, ref } from 'vue';
import type { VNodeChild } from 'vue';
import { NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import {
  EnumApplicationFormType,
  EnumApplicationFormState,
  EnumFunctionModule
} from '@/enum';
import { format, utcToZonedTime } from 'date-fns-tz';
import { fetchesObj, FetchKeys } from './fetch';
import { renderState, renderExpand } from './render';

export type Types = keyof typeof EnumApplicationFormType;
export type States = keyof typeof EnumApplicationFormState;
export type Modules = keyof typeof EnumFunctionModule;

interface ApplyModule {
  Module: Modules;
  Date?: Date;
}

export interface ApplicationTableData extends Object {
  ApplicationFormId: number;
  Sale: string;
  Type: Types;
  State: States;
  Customer: string;
  CRMUrl: string;
  CreateTime: Date;
  ApplyModule?: ApplyModule[];
  PerSeat?: number;
  TestDays?: number;
  ExpiredDate?: Date;
  RejectReason?: string;
  ManagerCheck?: string;
  FinalCheck?: string;
  Canceller?: string;
}

const stateFilterOptions = Object.entries(fetchesObj).map(([k, v]) => ({
  value: k as FetchKeys,
  label: v.label
}));

export function createColumns({
  renderIndex,
  renderAction
}: {
  renderIndex: (index: number) => number;
  renderAction: (rowData: ApplicationTableData, index: number) => VNodeChild;
}): DataTableColumns<ApplicationTableData> {
  return [
    {
      type: 'expand',
      renderExpand: renderExpand
    },
    {
      title: '#',
      key: 'index',
      render: (_, index: number) => {
        return `${renderIndex(index)}`;
      },
      align: 'center',
      width: 60
    },
    {
      title: 'Sale',
      key: 'Sale'
    },
    {
      title: 'Customer',
      key: 'Customer'
    },
    {
      title: 'CRMUrl',
      key: 'CRMUrl'
    },
    {
      title: 'Type',
      key: 'Type',
      render(rowData) {
        return EnumApplicationFormType[rowData.Type];
      }
    },
    {
      title: 'ApplyModule',
      key: 'ApplyModule',
      render: (rowData) => {
        const tags = rowData.ApplyModule?.map((item: ApplyModule) => {
          return h(
            NTag,
            {
              type: 'default',
              size: 'small'
            },
            {
              default: () => EnumFunctionModule[item.Module]
            }
          );
        });
        return h('div', { class: 'flex flex-wrap gap-[6px]' }, tags);
      }
    },
    {
      title: 'State',
      key: 'State',
      render: renderState,
      filterMultiple: false,
      filter: true,
      filterOptions: stateFilterOptions
    },
    {
      title: 'CreateTime',
      key: 'CreateTime',
      render: (rowData) => {
        const zonedDate = utcToZonedTime(rowData.CreateTime, 'Asia/Taipei');
        return format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
      }
    },
    {
      title: 'Action',
      key: 'Action',
      render: renderAction,
      align: 'center',
      width: 120
    }
  ];
}
