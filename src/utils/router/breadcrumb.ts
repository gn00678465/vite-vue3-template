import { useRenderIcon } from '@/composables';
import type { RouteLocationMatched, RouteRecordRaw } from 'vue-router';

function filterHideMenu(menu: RouteRecordRaw): boolean {
  return !menu.meta?.hide;
}

export function getBreadcrumbsByRouteMatched(
  activeRoute: string,
  routeMatched: RouteLocationMatched[]
) {
  return routeMatched.map((matched) =>
    transformToBreadcrumb(activeRoute, matched)
  );
}

export function transformToBreadcrumb(
  activeRoute: string,
  menu: RouteLocationMatched
) {
  const breadcrumb: GlobalBreadcrumb = {
    key: menu.name as string,
    label: menu.meta.title as string,
    disabled: activeRoute === menu.name,
    routeName: menu.name as string,
    hasChildren: Boolean(menu.children && menu.children.length)
  };
  if (menu.meta.icon) {
    breadcrumb.icon = useRenderIcon({
      icon: menu.meta.icon as string,
      fontSize: '16px'
    });
  }
  if (menu.children && !!menu.children.length) {
    breadcrumb.children = menu.children
      .filter(filterHideMenu)
      .map((subMenu) =>
        transformToBreadcrumb(activeRoute, subMenu as RouteLocationMatched)
      );
  }
  return breadcrumb;
}

// export function getBreadcrumbsByRoute(
//   activeRoute: string,
//   menus: GlobalMenuOption[]
// ) {
//   const result = getBreadcrumbsMenu(activeRoute, menus);
//   const breadcrumb = transformToBreadcrumb(activeRoute, result);
//   return breadcrumb;
// }

// export function getBreadcrumbsMenu(
//   activeRoute: string,
//   menus: GlobalMenuOption[]
// ) {
//   const breadcrumbMenu: GlobalMenuOption[] = [];
//   menus.some((menu: GlobalMenuOption) => {
//     const flag = activeRoute.includes(menu.routeName);
//     if (flag) {
//       breadcrumbMenu.push(...getBreadcrumbMenuItem(activeRoute, menu));
//     }
//   });
//   return breadcrumbMenu;
// }

// export function getBreadcrumbMenuItem(
//   activeRoute: string,
//   menu: GlobalMenuOption
// ) {
//   const breadcrumbMenu: GlobalMenuOption[] = [];
//   if (activeRoute === menu.routeName) {
//     breadcrumbMenu.push(menu);
//   }
//   if (
//     activeRoute.includes(menu.routeName) &&
//     menu.children &&
//     menu.children.length
//   ) {
//     breadcrumbMenu.push(menu);
//     breadcrumbMenu.push(
//       ...menu.children
//         .map((subMenu: GlobalMenuOption) =>
//           getBreadcrumbMenuItem(activeRoute, subMenu as GlobalMenuOption)
//         )
//         .flat(1)
//     );
//   }
//   return breadcrumbMenu;
// }

// export function transformToBreadcrumb(
//   activeRoute: string,
//   menus: GlobalMenuOption[]
// ) {
//   return menus.map((menu) => {
//     const hasChildren = Boolean(menu.children && menu.children.length);
//     const breadcrumb: GlobalBreadcrumb = {
//       key: menu.routeName,
//       label: menu.label as string,
//       disabled: activeRoute === menu.routeName,
//       routeName: menu.routeName,
//       hasChildren
//     };
//     if (menu.icon) {
//       breadcrumb.icon = menu.icon;
//     }
//     if (menu.children && menu.children.length) {
//       breadcrumb.children = transformToBreadcrumb(activeRoute, menu.children);
//     }
//     return breadcrumb;
//   });
// }
