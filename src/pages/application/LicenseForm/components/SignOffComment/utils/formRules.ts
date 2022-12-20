import type { FormItemRule } from 'naive-ui';
import type { FormValue } from '.';

export const commonRules = (formValue: FormValue) => [
  {
    required: formValue.signOff === 'reject',
    trigger: 'input',
    validator(rule: FormItemRule, value: string) {
      if (formValue.signOff === 'reject' && !value)
        return new Error('請輸入意見!');
      return true;
    }
  }
];

export const signOffRules = [
  {
    required: true,
    trigger: ['input', 'blur'],
    validator(rule: FormItemRule, value: string) {
      if (!value) return new Error('請選擇核准或者駁回');
      return true;
    }
  }
];
