import { defineComponent, toRefs, ref } from 'vue';
import { NInput, NFormItem } from 'naive-ui';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'POCReason',
  emits: ['update:value'],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const { value } = toRefs(props);

    function handleChange(value: string) {
      emit('update:value', value);
    }

    return () => (
      <NFormItem label={t('components.licenseForm.label.POCReason')}>
        <NInput
          value={value.value}
          defaultValue={value.value}
          type="textarea"
          on-update:value={handleChange}
        />
      </NFormItem>
    );
  }
});
