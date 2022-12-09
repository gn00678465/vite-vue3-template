declare namespace EnumType {
  /** Login modules  */
  type LoginModuleKey = keyof typeof import('@/enum').EnumLoginModules;
}

declare namespace App {
  interface GlobalTabRoute
    extends Pick<
      import('vue-router').RouteLocationNormalizedLoaded,
      'name' | 'fullPath' | 'meta'
    > {
    scrollPosition?: {
      left: number;
      top: number;
    };
  }
}
