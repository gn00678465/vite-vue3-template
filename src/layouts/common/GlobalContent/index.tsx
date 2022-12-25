import { defineComponent, Transition, KeepAlive } from 'vue';
import type { RouteLocationNormalized, RouteComponent } from 'vue-router';
import { useAppStore, useRouteStore } from '@/stores';

export default defineComponent({
  name: 'GlobalContent',
  setup(props) {
    const appStore = useAppStore();
    const routeStore = useRouteStore();

    return () => (
      <div class="px-4 py-2 h-full bg-[#f6f9f8] dark:bg-[#101014] transition duration-300 ease-in-out">
        <router-view>
          {{
            default: ({
              Component,
              route
            }: {
              Component: any;
              route: RouteLocationNormalized;
            }) => (
              <Transition name="fade-slide" mode="out-in" appear>
                <KeepAlive include={routeStore.cacheRoutes}>
                  {appStore.reloadFlag && <Component key={route.fullPath} />}
                </KeepAlive>
              </Transition>
            )
          }}
        </router-view>
      </div>
    );
  }
});
