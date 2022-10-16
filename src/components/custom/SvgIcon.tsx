import { defineComponent, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

const SvgIcon = defineComponent({
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { icon } = toRefs(props);
    const tag = `icon-${icon.value}`;

    return () => <Icon icon={icon.value} />;
  }
});

export default SvgIcon;
