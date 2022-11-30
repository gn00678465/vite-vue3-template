import { defineComponent, Transition, computed, h } from 'vue';
import type { ComputedRef, Component } from 'vue';
import type { RouteLocationNormalized, RouteComponent } from 'vue-router';

export default defineComponent({
  name: 'GlobalContent',
  setup(props) {
    return () => (
      <router-view>
        {{
          default: ({
            Component,
            route
          }: {
            Component: RouteComponent;
            route: RouteLocationNormalized;
          }) => (
            <Transition name="fade-slide" mode="out-in" appear>
              <Component key={route.fullPath} />
            </Transition>
          )
        }}
      </router-view>
    );
  }
});
