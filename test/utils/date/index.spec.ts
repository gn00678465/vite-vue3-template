import { describe, expect, test } from 'vitest';
import * as date from '../../../src/utils/date';

describe('date', () => {
  test('toUTCDate', () => {
    expect(date.toUTCDate(1673366400000)).toBeInstanceOf(Date);
    // expect(date.toUTCDate(new Date(''))).toThrowError();
  });

  test('toUTCString', () => {
    expect(date.toUTCString(1673366400000)).toEqual(
      '2023-01-11T00:00:00+08:00'
    );

    expect(date.toUTCString(1673366400000, { timeZone: 'UTC' })).toEqual(
      '2023-01-10T16:00:00Z'
    );
  });

  test('toLocalDate', () => {
    expect(date.toLocalDate(1673366400000)).toBeInstanceOf(Date);
  });

  test('toLocalString', () => {
    expect(date.toLocalString(1673366400000)).toEqual('2023-01-11 00:00:00');
  });
});
