import { VNodeChild } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { useI18n } from '@/hooks';

export interface UserInfo extends Auth.UserInfo {
  Role?: number;
  Department?: number;
}

export function createColumns({
  renderIndex,
  renderDepartment,
  renderRole
}: {
  renderIndex: (index: number) => number;
  renderDepartment: (arg: UserInfo) => VNodeChild;
  renderRole: (arg: UserInfo) => VNodeChild;
}): DataTableColumns<UserInfo> {
  const { t } = useI18n();
  return [
    {
      title: '#',
      key: 'index',
      render: (_, index) => {
        return `${renderIndex(index)}`;
      }
    },
    {
      title: t('column.name', 2),
      key: 'Name'
    },
    {
      title: t('column.department'),
      key: 'Department',
      render: renderDepartment
    },
    {
      title: t('column.role'),
      key: 'Role',
      render: renderRole
    }
  ];
}
