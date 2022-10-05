import type { FormItemRule } from 'naive-ui';

export const createRequireFormRule = (message = '不得為空') => ({
  required: true,
  message,
  trigger: 'blur'
});

interface CustomFormRules {
  pwd: FormItemRule[];
}

export const formRules: CustomFormRules = {
  pwd: [createRequireFormRule('密碼不得為空')]
};
