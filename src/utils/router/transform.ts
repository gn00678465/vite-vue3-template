export function transformRoutePathToRouteName(path: string) {
  if (path === '/') return 'root';
  const pathSplitMark = '/';
  const routeSplitMark = '_';

  const name = path.split(pathSplitMark).slice(1).join(routeSplitMark);

  return name;
}
