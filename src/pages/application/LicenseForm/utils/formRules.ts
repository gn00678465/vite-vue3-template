import { FormItemRule } from 'naive-ui';
import { isBefore, parseISO } from 'date-fns';

export const rules = {
  SaleId: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: number) {
      if (!value) {
        return new Error('請選擇申請人員');
      }
      return true;
    }
  },
  CustomerId: {
    required: true,
    trigger: ['blur', 'input'],
    validator(rule: FormItemRule, value: number) {
      if (!value) {
        return new Error('請選擇客戶');
      }
      return true;
    }
  },
  TestDays: {
    required: true,
    trigger: ['blur', 'input'],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('請輸入測試天數');
      } else if (!/^\d*$/.test(value)) {
        return new Error('測試天數必須為數字');
      } else if (Number(value) > 90) {
        return new Error('測試天數不可大於 90 天');
      }
      return true;
    }
  },
  PerSeat: {
    required: true,
    trigger: ['blur', 'input'],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('請輸入測試數量');
      } else if (!/^\d*$/.test(value)) {
        return new Error('測試數量必須為數字');
      }
      return true;
    }
  },
  ExpiredDate: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('請選擇授權到期日期');
      }
      if (isBefore(parseISO(value), new Date())) {
        return new Error('授權到期日期不可小於今天');
      }
      return true;
    }
  },
  WarrantyExpired: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('請選擇保固到期日期');
      }
      if (isBefore(parseISO(value), new Date())) {
        return new Error('保固到期日期不可小於今天');
      }
      return true;
    }
  },
  ApplyModule: [
    {
      required: true,
      trigger: 'blur',
      validator(rule: FormItemRule, value: Array<number>) {
        if (!value.length) {
          return new Error('請選擇模組');
        }
        return true;
      }
    }
  ],
  Images: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('請上傳申請單');
      }
      return true;
    }
  }
};
