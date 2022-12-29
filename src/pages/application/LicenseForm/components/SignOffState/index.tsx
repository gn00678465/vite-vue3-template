import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '@/hooks';
import { messages } from '../../../locales';

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
    const { t } = useI18n({
      messages: messages
    });

    return () => (
      <div class="flex items-center justify-between">
        <ul class="flex flex-col gap-y-1">
          <li>
            <p>單號： {route.params.id}</p>
          </li>
          <li>
            <p>狀態： {t(props.state, 1)}</p>
          </li>
        </ul>
        {slots.actions?.()}
      </div>
    );
  }
});
