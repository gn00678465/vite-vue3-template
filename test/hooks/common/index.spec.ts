import { unref } from 'vue';
import { describe, expect, it } from 'vitest';
import * as common from '../../../src/hooks/common';

describe('hooks/common', () => {
  it('useBoolean', () => {
    const { bool, setBool, setTrue, setFalse, toggle } =
      common.useBoolean(false);
    expect(unref(bool)).toBeFalsy;
    toggle();
    expect(unref(bool)).toBeTruthy;
    setBool(false);
    expect(unref(bool)).toBeFalsy;
    setTrue();
    expect(unref(bool)).toBeTruthy;
    setFalse();
    expect(unref(bool)).toBeFalsy;
  });

  it('useLoading', () => {
    const { loading, loadingStart, loadingEnd } = common.useLoading(false);
    expect(unref(loading)).toBeFalsy;
    loadingStart();
    expect(unref(loading)).toBeTruthy;
    loadingEnd();
    expect(unref(loading)).toBeFalsy;
  });

  it('useRandomId', () => {
    const str = common.useRandomId(4);
    expect(str).toBeTypeOf('string');
    expect(str.length).toEqual(4);
  });
});
