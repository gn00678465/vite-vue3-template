type GlobalMenuOption = import('naive-ui').MenuOption & {
  key: string;
  label: string;
  disabled?: boolean;
  routeName: string;
  routePath: string;
  icon?: () => import('vue').VNodeChild;
  children?: GlobalMenuOption[];
};

type GlobalBreadcrumb = import('naive-ui').DropdownOption & {
  key: string;
  label: string;
  routeName?: string;
  disabled?: boolean;
  hasChildren?: boolean;
  icon?: () => import('vue').VNodeChild;
  children?: GlobalBreadcrumb[];
};
