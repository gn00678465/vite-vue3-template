import { describe, expect, test, vi } from 'vitest';
import { omit } from '../../src/utils/common';
import * as is from '../../src/utils/common/is';
import * as math from '../../src/utils/common/math';
import * as pattern from '../../src/utils/common/pattern';
import { pagination } from '../../src/utils/common/pagination';

describe('common', () => {
  test('should works with omit', () => {
    const objA = { c: 3 };
    const objB = { a: 1, b: 2, d: objA };

    expect(omit(objB, ['a'])).toEqual({ b: 2, d: objA });
    expect(omit(objB, ['a', 'b'], { a: 'alpha', b: 'beta' })).toEqual({
      a: 'alpha',
      b: 'beta',
      d: { c: 3 }
    });
  });
});

describe('is', () => {
  test('typeOf', () => {
    expect(is.typeOf(['[object String]'])).toBeTypeOf('function');
  });

  test.each([
    ['isNumber', 1],
    ['isNumber', Infinity],
    ['isString', '123'],
    ['isString', 'abc'],
    ['isBoolean', true],
    ['isBoolean', false],
    ['isArray', []],
    ['isArray', new Array(1)],
    ['isObject', {}],
    ['isObject', Object.create(null)],
    ['isFunction', function () {}],
    ['isFunction', () => {}],
    ['isFunction', new Function()],
    ['isNull', null],
    ['isUndefined', undefined],
    ['isRegexp', new RegExp('')],
    ['isRegexp', /a/],
    ['isSet', new Set()],
    ['isMap', new Map()],
    ['isDate', new Date()]
  ])('return true when values of type %s are true.', (a, b) => {
    expect(is[a](b)).toBeTruthy;
  });

  test.each([
    ['isNumber', '1'],
    ['isNumber', false],
    ['isString', 123],
    ['isString', []],
    ['isBoolean', {}],
    ['isBoolean', new Date()],
    ['isArray', new Set()],
    ['isArray', null],
    ['isObject', undefined],
    ['isObject', []],
    ['isFunction', '123'],
    ['isFunction', 123],
    ['isFunction', {}],
    ['isNull', undefined],
    ['isUndefined', null],
    ['isRegexp', 123],
    ['isRegexp', '123'],
    ['isSet', new Map()],
    ['isMap', new Set()],
    ['isDate', '2022/12/30']
  ])('return true when values of type %s are false.', (a, b) => {
    expect(is[a](b)).toBeFalsy;
  });
});

describe('math', () => {
  test('useAPTerm', () => {
    expect(math.useAPTerm(-1, 10).value).toEqual(0);
    expect(math.useAPTerm(0, 10).value).toEqual(0);
    expect(math.useAPTerm(1, 0).value).toEqual(0);
    expect(math.useAPTerm(1, -1).value).toEqual(0);
    expect(math.useAPTerm(1, 10).value).toEqual(0);
    expect(math.useAPTerm(2, 10).value).toEqual(10);
    expect(math.useAPTerm(3, 20).value).toEqual(40);
  });
});

describe('pattern', () => {
  const mockA = vi.fn(() => 0);
  const mockB = vi.fn(() => 0);
  const mockC = vi.fn(() => 0);

  const strategy = (str) => {
    return [
      [str === 'a', mockA],
      [str === 'b', mockB],
      [str === 'c', mockC]
    ];
  };

  test('execStrategyActions', () => {
    pattern.execStrategyActions(strategy('a'));

    expect(mockA).toHaveBeenCalled();
    expect(mockB).not.toHaveBeenCalled();
    expect(mockC).not.toHaveBeenCalled();

    pattern.execStrategyActions(strategy('b'));
    expect(mockB).toHaveBeenCalled();
  });
});

describe('pagination', () => {
  test.each([
    [
      [1, 2, 3, 4, 5],
      [[1, 2], [3, 4], [5]]
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [
        [1, 2],
        [3, 4],
        [5, 6]
      ]
    ],
    [[], []]
  ])(
    'return right hand side value when difference to left hand side value.  (%s, %s)',
    (a, b) => {
      expect(pagination(a, 2)).toEqual(b);
    }
  );
});
