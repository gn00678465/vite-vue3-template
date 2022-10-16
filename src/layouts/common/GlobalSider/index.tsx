import { defineComponent } from 'vue';
import GlobalLogo from '../GlobalLogo';
import { VerticalMenu } from './components';

export default defineComponent({
  name: 'GlobalSider',
  setup() {
    return () => (
      <>
        <GlobalLogo class="h-[50px] border-b border-dashed" />
        <div class="">
          <VerticalMenu></VerticalMenu>
        </div>
      </>
    );
  }
});
