import { defineComponent, toRefs, computed } from 'vue';
import { Icon } from '@iconify/vue';

const SvgIcon = defineComponent({
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs }) {
    const { icon } = toRefs(props);
    const tag = `icon-${icon.value}`;

    const bindAttrs = computed<{ class: string; style: string }>(() => ({
      class: (attrs.class as string) || '',
      style: (attrs.style as string) || ''
    }));

    return () => <Icon icon={icon.value} {...bindAttrs} />;
  }
});

export default SvgIcon;
