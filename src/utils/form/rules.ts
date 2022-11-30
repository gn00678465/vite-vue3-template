import type { FormItemRule } from 'naive-ui';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/config';

export const createRequireFormRule = (message = '不得為空') => ({
  required: true,
  message,
  trigger: 'blur'
});

interface CustomFormRules {
  userName: FormItemRule[];
  password: FormItemRule[];
}

export const formRules: CustomFormRules = {
  userName: [
    createRequireFormRule('使用者名稱不得為空'),
    { pattern: EMAIL_REGEX, message: '使用者名稱格式錯誤', trigger: 'blur' }
  ],
  password: [
    createRequireFormRule('密碼不得為空'),
    {
      pattern: PASSWORD_REGEX,
      message: '密碼至少需包含(大小寫字母、符號、數字)，且8-16字元。',
      trigger: 'blur'
    }
  ]
};
