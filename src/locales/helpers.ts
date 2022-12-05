import { assocPath } from 'ramda';

export type LangType = Record<string, Record<string, any>>;

export function genMessage(langs: LangType, prefix: string) {
  return Object.keys(langs).reduce((obj, key) => {
    const module = langs[key].default;
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    return assocPath(keyList, module, obj);
  }, {});
}
