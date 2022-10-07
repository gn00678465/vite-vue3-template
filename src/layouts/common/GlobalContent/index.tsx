import { defineComponent, Transition, computed } from 'vue';
import type { ComputedRef } from 'vue';

export default defineComponent({
  name: 'GlobalContent',
  setup(props) {
    return () => (
      <div class="h-full">
        <router-view>
          {{
            default: ({ Component, route }) => (
              <Transition mode="out-in" appear>
                <Component key={route.fullName}></Component>
              </Transition>
            )
          }}
        </router-view>
      </div>
    );
  }
});
