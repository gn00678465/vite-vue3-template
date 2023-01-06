import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SignOffState',
  props: {
    state: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const route = useRoute();
    const { t } = useI18n();

    return () => (
      <div class="flex items-center justify-between">
        <ul class="flex flex-col gap-y-1">
          <li>
            <p>單號： {route.params.id}</p>
          </li>
          <li>
            <p>
              {t('common.state')}：{' '}
              {t(`components.licenseForm.present.state.${props.state}`, 1)}
            </p>
          </li>
        </ul>
        {slots.actions?.()}
      </div>
    );
  }
});
