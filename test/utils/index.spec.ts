import { describe, expect, test } from 'vitest';
import { omit } from '../../src/utils/common';

describe('common', () => {
  test('should works with omit', () => {
    const objA = { c: 3 }
    const objB = { a: 1, b: 2, d: objA }

    expect(omit(objB, ['a'])).toEqual({ b: 2, d: objA })
    expect(omit(objB, ['a', 'b'], { a: 'alpha', b: 'beta'})).toEqual({ a: 'alpha', b: 'beta', d: { c: 3 } })
  });
});
