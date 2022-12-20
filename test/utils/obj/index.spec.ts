import { describe, expect, test } from 'vitest';
import { diff } from '../../../src/utils/object';

describe('diff', () => {
  test.each([
    ['int', 1],
    ['string', 'a'],
    ['boolean', true],
    ['null', null],
    ['undefined', undefined],
    ['object', { a: 1 }],
    ['array', [1]],
    ['function', () => ({})],
    ['date', new Date()]
  ])('return empty object when values of type %s are equal.', (a, b) => {
    expect(diff(b, b)).toEqual({});
  });

  test.each([
    [1, 2],
    ['a', 'b'],
    [true, false],
    ['hello', null],
    ['hello', undefined],
    [null, undefined],
    [undefined, null],
    [null, { a: 1 }],
    ['912345678', { areaCode: '+866', number: '912345678' }],
    [100, () => ({})],
    [() => ({}), 100],
    [{ a: 1 }, { a: {} }],
    [new Date('2017-01-01'), new Date('2017-01-02')]
  ])(
    'return right hand side value when difference to left hand side value.  (%s, %s)',
    (a, b) => {
      expect(diff(a, b)).toEqual(b);
    }
  );

  describe('recursive case', () => {
    test('returns subset of right hand side value when nested values differ', () => {
      expect(diff({ a: { b: 1, c: 2 } }, { a: { b: 1, c: 3 } })).toEqual({
        a: { c: 3 }
      });
    });

    test('returns subset of right hand side value when a key value has been deleted', () => {
      expect(
        diff({ a: { b: 1 }, c: 2, d: { e: 100 } }, { a: { b: 1 }, c: 2, d: {} })
      ).toEqual({ d: { e: undefined } });
    });

    test('returns subset of right hand side value when a key value has been added.', () => {
      expect(
        diff({ a: { b: 1 }, c: 2, d: {} }, { a: { b: 1 }, c: 2, d: { e: 100 } })
      ).toEqual({ d: { e: 100 } });
    });
  });

  describe('date', () => {
    const lhs = new Date('2021');
    const rhs = new Date('2022');
    test('returns empty object when dates are equal', () => {
      expect(diff(lhs, lhs)).toEqual({});
    });

    test('returns right hand site date when dates are difference', () => {
      expect(diff(lhs, rhs)).toEqual(rhs);
    });

    test('returns right hand side date when updated', () => {
      expect(diff({ date: lhs }, { date: rhs })).toEqual({ date: rhs });
    });
  });
});
