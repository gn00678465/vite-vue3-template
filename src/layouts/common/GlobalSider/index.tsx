import { defineComponent } from 'vue';
import GlobalLogo from '../GlobalLogo';
import { VerticalMenu } from './components';

export default defineComponent({
  name: 'GlobalSider',
  props: {
    collapsedWidth: {
      type: Number,
      default: 48
    }
  },
  setup(props) {
    return () => (
      <>
        <GlobalLogo class="h-[56px] border-b border-dashed" />
        <VerticalMenu collapsedWidth={props.collapsedWidth}></VerticalMenu>
      </>
    );
  }
});
