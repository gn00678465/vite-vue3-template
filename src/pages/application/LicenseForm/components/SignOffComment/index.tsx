import { defineComponent, ref, Ref, reactive, computed } from 'vue';
import {
  NFormItem,
  NForm,
  NRadio,
  NInput,
  NButton,
  NRadioGroup,
  FormInst,
  FormValidationError
} from 'naive-ui';
import { useI18n } from '@/hooks';
import { signOffRules, commonRules, FormValue } from './utils';

export default defineComponent({
  name: 'SignOffComment',
  setup() {
    const { t } = useI18n();

    const formValue = reactive<FormValue>({
      signOff: '',
      comment: ''
    });
    const formRef: Ref<null | FormInst> = ref(null);

    function handleChange(value: string) {
      formValue.signOff = value;
    }

    async function validateForm(formRef: Ref<null | FormInst>) {
      return new Promise((resolve, reject) => {
        formRef.value
          ?.validate((err?: Array<FormValidationError>) => {
            resolve(err);
          })
          .catch(reject);
      });
    }

    async function handleSubmit(e: Event) {
      e.preventDefault();
      const err = await validateForm(formRef);
      if (!err) {
        // do validate ok
      }
    }

    const formRules = computed(() => ({
      signOff: signOffRules,
      comment: commonRules(formValue)
    }));

    return () => (
      <>
        <h3 class="py-3 border-b border-dashed text-lg font-semibold">簽核</h3>
        <NForm
          ref={formRef}
          labelPlacement="left"
          model={formValue}
          rules={formRules.value}
          label-width={80}
          label-align="left"
          require-mark-placement="right"
        >
          <NFormItem path="signOff" label="簽核">
            <NRadioGroup
              name="sign-off"
              value={formValue.signOff}
              on-update:value={handleChange}
            >
              <NRadio value="approval">{t('common.approval')}</NRadio>
              <NRadio value="reject">{t('common.reject')}</NRadio>
            </NRadioGroup>
          </NFormItem>
          <NFormItem path="comment" label="簽核意見">
            <NInput
              type="textarea"
              value={formValue.comment}
              placeholder="請輸入簽核意見"
              on-update:value={(value: string) => {
                formValue.comment = value.trim();
              }}
            />
          </NFormItem>
          <div class="flex items-center justify-around">
            <NButton round type="primary" onClick={handleSubmit}>
              {t('common.submit')}
            </NButton>
            <NButton round>{t('common.cancel')}</NButton>
          </div>
        </NForm>
      </>
    );
  }
});
