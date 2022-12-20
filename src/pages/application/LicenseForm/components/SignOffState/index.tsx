import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignOffState',
  props: {
    state: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex items-center justify-between">
        {props.state}
        {slots.actions?.()}
      </div>
    );
  }
});
