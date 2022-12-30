import { describe, expect, it, vi } from 'vitest';
import {
  createLocalStorage,
  localStorage as local
} from '../../../src/utils/storage';
import { encrypt, decrypt } from '../../../src/utils/crypto';

describe('localStorage', () => {
  const mockWindow = {
    localStorage: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    }
  };

  it('createLocalStorage', () => {
    expect(createLocalStorage).toBeTypeOf('function');
  });

  it('set', () => {
    vi.stubGlobal('window', mockWindow);
    local.set('key', 'value');
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('get', () => {
    vi.stubGlobal('window', mockWindow);
    const res = local.get('key');
    expect(window.localStorage.getItem).toHaveBeenCalled();
    expect(res).toBeNull;
  });

  it('get value when value not valid JSON string.', () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(
      "{'value':'1234'}"
    );
    const res = local.get('key');
    expect(res).toBeNull;
  });

  it('get value when value is valid JSON string.', () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(
      '{"value":"1234"}'
    );
    const res = local.get('key');
    expect(res).toEqual('1234');
  });

  it('remove', () => {
    vi.stubGlobal('window', mockWindow);
    local.remove('key');
    expect(window.localStorage.removeItem).toHaveBeenCalled();
  });

  it('clear', () => {
    vi.stubGlobal('window', mockWindow);
    local.clear();
    expect(window.localStorage.clear).toHaveBeenCalled();
  });

  it('set with crypto', () => {
    vi.stubGlobal('window', mockWindow);
    local.set('key', 'value', { crypto: true });
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('get with decrypt', () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(
      encrypt({ value: '5678' })
    );
    const res = local.get('key', { crypto: true });
    expect(res).toEqual('5678');
  });
});
