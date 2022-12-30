import { describe, expect, test } from 'vitest';
import * as crypto from '../../../src/utils/crypto';

describe('crypto', () => {
  let cryptoData: string | null = null;

  test('encrypt', () => {
    const obj = { a: 'A' };
    cryptoData = crypto.encrypt(obj);
    expect(cryptoData).toBeTypeOf('string');
  });
  test('decrypt', () => {
    const data = crypto.decrypt(cryptoData as string);
    expect(data).toEqual({ a: 'A' });
    expect(crypto.decrypt('123456')).toBeNull;
  });
});
