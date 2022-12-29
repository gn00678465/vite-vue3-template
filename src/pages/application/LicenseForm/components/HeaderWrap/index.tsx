import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'HeaderWrap',
  props: {
    title: {
      type: String,
      default: ''
    },
    describe: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { title, className, describe } = toRefs(props);

    return () => (
      <>
        <div class="py-3 border-b border-dashed flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold">{title.value}</h3>
            {describe.value && (
              <p class="text-sm text-gray-400">{describe.value}</p>
            )}
          </div>
          {slots?.extra?.()}
        </div>
        <div class={['px-2 py-4', className.value]}>{slots?.default?.()}</div>
      </>
    );
  }
});
