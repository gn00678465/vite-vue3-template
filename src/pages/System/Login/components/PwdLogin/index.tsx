import { defineComponent, reactive, ref } from 'vue';
import { NForm, NFormItem, NInput, NSpace, NCheckbox, NButton } from 'naive-ui';
import type { FormInst, FormRules, FormValidationError } from 'naive-ui';
import { createRequireFormRule, formRules } from '@/utils';
import { EnumLoginModules } from '@/enum';
import { useAuthApi } from '@/service/api';

export default defineComponent({
  name: 'PwdLogin',
  setup(props, ctx) {
    const formRef = ref<(HTMLElement & FormInst) | null>(null);
    const { fetchLogin } = useAuthApi();

    const rememberMe = ref<boolean>(false);

    const model = reactive({
      userName: '',
      password: ''
    });

    const rules: FormRules = {
      userName: [createRequireFormRule('使用者名稱不得為空')],
      password: formRules.pwd
    };

    async function handleSubmit(e: MouseEvent) {
      e.preventDefault();
      formRef.value?.validate(
        (error: Array<FormValidationError> | undefined) => {
          if (!error) {
            fetchLogin(model.userName, model.password).then((res) => {
              console.log(res);
            });
          }
        }
      );
    }

    return () => (
      <NForm
        ref={formRef}
        size="large"
        showLabel={false}
        model={model}
        rules={rules}
      >
        <NFormItem path="userName" label="使用者名稱">
          <NInput
            v-model={[model.userName, 'value']}
            placeholder="請輸入使用者名稱"
          />
        </NFormItem>
        <NFormItem path="password" label="使用者密碼">
          <NInput
            v-model={[model.password, 'value']}
            placeholder="請輸入使用者密碼"
            type="password"
            showPasswordOn="click"
          />
        </NFormItem>
        <NSpace vertical size={24}>
          <div class="flex items-center justify-between">
            <NCheckbox v-model={[rememberMe.value, 'checked']}>
              記住我?
            </NCheckbox>
          </div>
          <NButton
            type="primary"
            size="large"
            block
            round
            on-click={handleSubmit}
          >
            確定
          </NButton>
          {/* <div class="flex items-center justify-between">
            <NButton block>{EnumLoginModules.register}</NButton>
          </div> */}
        </NSpace>
      </NForm>
    );
  }
});
