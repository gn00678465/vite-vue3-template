import path from 'path';

export function getRootPath() {
  return path.resolve(process.cwd());
}

export function getSrcPath(pathName = 'src') {
  const rootPath = getRootPath();
  return `${rootPath}/${pathName}`;
}
