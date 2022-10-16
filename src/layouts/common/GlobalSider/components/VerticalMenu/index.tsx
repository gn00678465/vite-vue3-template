import { defineComponent, computed } from 'vue';
import { NScrollbar, NMenu } from 'naive-ui';
import { useRoute } from 'vue-router';
import { useRouteStore } from '@/stores';
import { useRouterPush } from '@/composables';

export default defineComponent({
  name: 'VerticalMenu',
  setup() {
    const route = useRoute();
    const routeStore = useRouteStore();
    const { routerPush } = useRouterPush();

    const menus = computed(() => routeStore.menus as GlobalMenuOption[]);
    const activeKey = computed<string>(() => route.name as string);

    function handleRouterPush(key: string, item: GlobalMenuOption) {
      routerPush({ path: item.routePath });
    }

    function handleExpandedKeys(keys: string[]) {
      console.log(keys);
    }

    return () => (
      <NScrollbar>
        <NMenu
          value={activeKey.value}
          options={menus.value}
          collapsed-icon-size={22}
          indent={18}
          on-update:value={handleRouterPush}
          on-update:expanded-keys={handleExpandedKeys}
        ></NMenu>
      </NScrollbar>
    );
  }
});
