import { defineComponent } from 'vue';
import { GlobalLogo } from '../../../index';
import { VerticalMenu } from './components';

export default defineComponent({
  name: 'VerticalSider',
  setup() {
    return () => (
      <>
        <GlobalLogo />
        <VerticalMenu />
      </>
    );
  }
});
