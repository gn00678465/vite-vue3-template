import type { VNodeChild } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import {
  EnumLicenseFormType,
  EnumLicenseFormState,
  EnumFunctionModule
} from '@/enum';
import { fetchesObj, FetchKeys } from './fetch';
import { renderState } from './render';
import { stateDefault } from './fetch';
import { useI18n } from '@/hooks';
import { toLocalString } from '@/utils';

export type Types = keyof typeof EnumLicenseFormType;
export type States = keyof typeof EnumLicenseFormState;
export type Modules = keyof typeof EnumFunctionModule;

export interface ApplyModule {
  Module: Modules;
  Date?: Date;
}

export interface ApplicationTableData extends Object {
  ApplicationFormId: number;
  SaleId: number;
  Type: Types;
  State: States;
  CustomerId: number;
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

type RenderFn = (rowData: ApplicationTableData, index?: number) => VNodeChild;

export function createColumns({
  renderIndex,
  renderSale,
  renderCustomer,
  renderAction,
  renderModule
}: {
  renderIndex: (index: number) => number;
  renderSale: RenderFn;
  renderCustomer: RenderFn;
  renderAction: RenderFn;
  renderModule: RenderFn;
}): DataTableColumns<ApplicationTableData> {
  const { t } = useI18n();

  return [
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
      title: t('column.ID'),
      key: 'ApplicationFormId',
      align: 'center',
      width: 60
    },
    {
      title: t('column.Sale'),
      key: 'SaleId',
      render: renderSale
    },
    {
      title: t('column.Customer'),
      key: 'CustomerId',
      render: renderCustomer
    },
    {
      title: t('column.Type'),
      key: 'Type',
      render(rowData) {
        return t(EnumLicenseFormType[rowData.Type]) + '申請單';
      }
    },
    {
      title: t('column.ApplyModule'),
      key: 'ApplyModule',
      render: renderModule
    },
    {
      title: t('column.State'),
      key: 'State',
      render: renderState,
      filterMultiple: false,
      filter: true,
      filterOptionValue: stateDefault.value,
      filterOptions: stateFilterOptions
    },
    {
      title: t('column.CreateTime'),
      key: 'CreateTime',
      render: (rowData) => {
        return toLocalString(rowData.CreateTime);
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
