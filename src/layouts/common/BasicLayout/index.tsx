import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider
} from 'naive-ui';

interface IProps {
  siderVisible?: boolean;
  headerVisible?: boolean;
  footerVisible?: boolean;
}

export default defineComponent({
  name: 'BasicLayout',
  props: {
    siderVisible: {
      type: Boolean,
      default: false
    },
    headerVisible: {
      type: Boolean,
      default: true
    },
    footerVisible: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    return () => (
      <NLayout has-sider>
        {props.siderVisible && (
          <NLayoutSider>{slots.sider ? slots.sider() : null}</NLayoutSider>
        )}
        <NLayout>
          {props.headerVisible && (
            <NLayoutHeader>
              {slots.header ? slots.header() : null}
            </NLayoutHeader>
          )}
          <NLayoutContent>
            {slots.content ? slots.content() : null}
          </NLayoutContent>
          {props.footerVisible && (
            <NLayoutFooter>
              {slots.footer ? slots.footer() : null}
            </NLayoutFooter>
          )}
        </NLayout>
      </NLayout>
    );
  }
});
