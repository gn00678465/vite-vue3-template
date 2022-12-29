import { describe, expect, test } from 'vitest';
import { pagination } from '../../src/utils/common/pagination';

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
