import { AdminLayout, BlankLayout } from '@/layouts';

export function getLayoutComponent(layoutType: EnumType.LayoutComponentName) {
  const layoutComponent = {
    basic: AdminLayout,
    blank: BlankLayout
  };
  return layoutComponent[layoutType];
}
