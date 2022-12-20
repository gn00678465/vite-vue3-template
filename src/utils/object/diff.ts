import { isObject, isDate, isEmptyObj } from '../common';

export const diff = (lhs: any, rhs: any) => {
  if (lhs === rhs) return {}; // equal return no diff

  if (!isObject(lhs) || !isObject(rhs)) return rhs; // return updated rhs

  const deletedValues = Object.keys(lhs).reduce((acc, key) => {
    if (!Object.prototype.hasOwnProperty.call(rhs, key)) {
      acc[key] = undefined;
    }
    return acc;
  }, Object.create(null));

  if (isDate(lhs) || isDate(rhs)) {
    if (lhs.valueOf() === rhs.valueOf()) return {};
    return rhs;
  }

  return Object.keys(rhs).reduce((acc, key) => {
    if (!Object.prototype.hasOwnProperty.call(lhs, key)) {
      acc[key] = rhs[key]; // return added r key
      return acc;
    }

    const difference = diff(lhs[key], rhs[key]);

    // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
    if (
      isEmptyObj(difference) &&
      !isDate(difference) &&
      (isEmptyObj(lhs[key]) || !isEmptyObj(rhs[key]))
    )
      return acc; // return no diff

    acc[key] = difference; // return updated key
    return acc; // return updated key
  }, deletedValues);
};
