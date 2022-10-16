import { useRenderIcon } from '@/composables';

interface IConfig {
  menu: GlobalMenuOption;
  icon?: string;
  children?: GlobalMenuOption[];
}

export function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta?.hide);
}

export function transformMenuItem(config: IConfig) {
  const item = { ...config.menu };
  const { icon, children } = config;
  if (children) {
    Object.assign(item, { children });
  }
  if (icon) {
    Object.assign(item, { icon: useRenderIcon({ icon, size: '16' }) });
  }
  return item;
}

export function transformToMenu(routes: AuthRoute.Route[]): GlobalMenuOption[] {
  const menus: GlobalMenuOption[] = [];
  routes.forEach((route) => {
    const { name, path, meta } = route;
    const routeName = name as string;
    let menuChildren: GlobalMenuOption[] | undefined;
    if (route.children) {
      menuChildren = transformToMenu(route.children);
    }
    const menuItem = transformMenuItem({
      menu: {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path
      },
      icon: meta?.icon,
      children: menuChildren
    });

    menus.push(menuItem);
  });
  return menus;
}
