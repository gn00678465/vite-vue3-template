import { defineComponent, computed } from 'vue';
import { NScrollbar, NMenu } from 'naive-ui';
import { useRouteStore } from '@/stores';
import { useRouterPush } from '@/composables';

export default defineComponent({
  name: 'VerticalMenu',
  setup() {
    const routeStore = useRouteStore();
    const menus = computed(() => routeStore.menus as GlobalMenuOption[]);
    const { routerPush } = useRouterPush();

    function handleRouterPush(key: string, item: GlobalMenuOption) {
      routerPush({ path: item.routePath });
    }

    function handleExpandedKeys(keys: string[]) {
      console.log(keys);
    }

    return () => (
      <NScrollbar>
        <NMenu
          options={menus.value}
          on-update:value={handleRouterPush}
          on-update:expanded-keys={handleExpandedKeys}
        ></NMenu>
      </NScrollbar>
    );
  }
});
