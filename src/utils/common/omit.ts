export function omit<T, K extends keyof T, R extends Record<string, any>>(
  obj: T,
  keys: K[] = [],
  rest?: R
): Omit<T, K> & (R extends undefined ? {} : R) {
  const omitedObj: any = {};
  const originKeys = Object.getOwnPropertyNames(obj);
  originKeys.forEach((key) => {
    if (!(keys as string[]).includes(key)) {
      omitedObj[key] = obj[key as keyof T];
    }
  });
  return Object.assign(omitedObj, rest);
}
