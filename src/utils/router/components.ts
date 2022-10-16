import { AdminLayout, BlankLayout } from '@/layouts';
import type { Component } from 'vue';

export function getLayoutComponent(layoutType) {
  const layoutComponent = {
    basic: AdminLayout,
    blank: BlankLayout
  };
  return layoutComponent[layoutType];
}
