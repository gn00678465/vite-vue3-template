import { defineComponent, computed } from 'vue';
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui';
import { useRoute } from 'vue-router';
import type { RouteLocationMatched } from 'vue-router';
import { useRouteStore } from '@/stores';
import { getBreadcrumbsByRouteMatched } from '@/utils';
import { useRouterPush } from '@/composables';

export default defineComponent({
  name: 'GlobalBreadcrumb',
  setup() {
    const route = useRoute();
    const routeStore = useRouteStore();

    const { routerPush } = useRouterPush();

    const breadcrumbList = computed<GlobalBreadcrumb[]>(() =>
      getBreadcrumbsByRouteMatched(
        route.name as string,
        route.matched as RouteLocationMatched[]
      )
    );

    function handleSelect(key: string) {
      routerPush({ name: key });
    }
    return () => (
      <NBreadcrumb>
        {breadcrumbList.value.map((item) => {
          return (
            <NBreadcrumbItem key={item.key}>
              {item.hasChildren ? (
                <NDropdown options={item.children} on-select={handleSelect}>
                  <span class="flex items-center gap-x-1">
                    <span class="text-base">{item.icon && item.icon()}</span>
                    {item.label}
                  </span>
                </NDropdown>
              ) : (
                <span class="flex items-center gap-x-1">
                  <span class="text-base">{item.icon && item.icon()}</span>
                  {item.label}
                </span>
              )}
            </NBreadcrumbItem>
          );
        })}
      </NBreadcrumb>
    );
  }
});
