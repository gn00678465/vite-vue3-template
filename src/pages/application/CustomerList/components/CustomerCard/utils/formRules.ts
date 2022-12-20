import { FormItemRule } from 'naive-ui';
import { URL_REGEX } from '@/config';
import { useNotification } from '@/hooks';

const { createErrorNotify } = useNotification({ duration: 1500 });

export const rules = {
  Customer: [
    {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          createErrorNotify({ title: '驗證錯誤', content: '請填入客戶名稱!' });
          return false;
        }
        return true;
      }
    }
  ],
  CRMUrl: [
    {
      required: true,
      trigger: 'blur',
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          createErrorNotify({ title: '驗證錯誤', content: '請填入 CRM 網址!' });
          return false;
        }
        if (!URL_REGEX.test(value)) {
          createErrorNotify({
            title: '驗證錯誤',
            content: 'CRM 網址格式錯誤!'
          });
          return false;
        }
        return true;
      }
    }
  ]
};
