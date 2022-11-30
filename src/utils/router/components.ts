import { AdminLayout, BlankLayout } from '@/layouts';
import type { DefineComponent } from 'vue';

export function getLayoutComponent(layoutType: string) {
  const layoutComponent = {
    basic: AdminLayout,
    blank: BlankLayout
  };
  return layoutComponent[layoutType];
}
