import { defineComponent, Transition, KeepAlive } from 'vue';
import type { ComputedRef, Component } from 'vue';
import type { RouteLocationNormalized, RouteComponent } from 'vue-router';
import { useAppStore } from '@/stores';

export default defineComponent({
  name: 'GlobalContent',
  setup(props) {
    const app = useAppStore();

    return () => (
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
              <KeepAlive>
                {app.reloadFlag && <Component key={route.fullPath} />}
              </KeepAlive>
            </Transition>
          )
        }}
      </router-view>
    );
  }
});
