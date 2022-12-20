import { EnumTypeof } from '@/enum';
import { isEmpty } from 'ramda';

export function typeOf(assertions: string[]) {
  return (x: unknown) => {
    const type = Object.prototype.toString.call(x);
    return assertions.includes(type);
  };
}

export function isNumber(x: unknown) {
  return typeOf(EnumTypeof.number.split(','))(x);
}

export function isString(x: unknown) {
  return typeOf(EnumTypeof.string.split(','))(x);
}

export function isBoolean(x: unknown) {
  return typeOf(EnumTypeof.boolean.split(','))(x);
}

export function isArray(x: unknown) {
  return typeOf(EnumTypeof.array.split(','))(x);
}

export function isObject(x: unknown) {
  return typeOf(EnumTypeof.object.split(','))(x);
}

export function isFunction(x: unknown) {
  return typeOf(EnumTypeof.function.split(','))(x);
}

export function isNull(x: unknown) {
  return typeOf(EnumTypeof.null.split(','))(x);
}

export function isUndefined(x: unknown) {
  return typeOf(EnumTypeof.undefined.split(','))(x);
}

export function isRegexp(x: unknown) {
  return typeOf(EnumTypeof.regexp.split(','))(x);
}

export function isSet(x: unknown) {
  return typeOf(EnumTypeof.set.split(','))(x);
}

export function isMap(x: unknown) {
  return typeOf(EnumTypeof.map.split(','))(x);
}

export function isFile(x: unknown) {
  return typeOf(EnumTypeof.file.split(','))(x);
}

export function isDate(x: unknown) {
  return typeOf(EnumTypeof.date.split(','))(x);
}

export const isEmptyObj = (obj: unknown): boolean =>
  isObject(obj) && isEmpty(obj);
