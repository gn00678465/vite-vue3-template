import { defineComponent, computed, watch } from 'vue';
import { NBackTop } from 'naive-ui';
import { useWindowScroll } from '@vueuse/core';

export default defineComponent({
  name: 'GlobalBackTop',
  setup() {
    const { y: scrollY } = useWindowScroll();

    const show = computed(() => scrollY.value > 180);

    watch(scrollY, (value) => {
      console.log(value);
    });

    return () => <NBackTop show={show.value} class="z-[1000]"></NBackTop>;
  }
});
