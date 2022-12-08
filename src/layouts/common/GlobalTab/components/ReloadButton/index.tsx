import { defineComponent } from 'vue';
import HoverContainer from '@/components/common/HoverContainer.vue';
import { Icon } from '@iconify/vue';
import { useAppStore } from '@/stores';
import { useBoolean } from '@/hooks';
import { useTimeoutFn } from '@vueuse/core';

export default defineComponent({
  name: 'ReloadButton',
  props: {},
  setup() {
    const {
      bool: loading,
      setTrue: loadingStart,
      setFalse: loadingEnd
    } = useBoolean(false);

    const app = useAppStore();

    function handleRefresh() {
      loadingStart();
      app.reloadPage();
      useTimeoutFn(loadingEnd, 1000);
    }

    return () => (
      <HoverContainer
        className="w-[64px] h-full"
        content="重整"
        placement="bottom"
        onClick={handleRefresh}
      >
        <Icon
          icon="mdi:refresh"
          class={['text-[22px]', loading.value && 'animate-spin']}
        />
      </HoverContainer>
    );
  }
});
