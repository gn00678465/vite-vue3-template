import { defineComponent, watch, onMounted } from 'vue';
import { ReloadButton, Tabs } from './components';
import { useTabStore } from '@/stores';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'GlobalTab',
  setup(props) {
    const tab = useTabStore();
    const route = useRoute();

    function init() {
      tab.iniTabStore(route);
    }

    onMounted(init);

    watch(
      () => route.fullPath,
      () => {
        tab.addTab(route);
        tab.setActiveTab(route.fullPath);
      }
    );

    return () => (
      <div class="flex w-full pl-4 shadow-tab h-[42px]">
        <div class="flex-1 self-end overflow-hidden">
          <Tabs />
        </div>
        <ReloadButton />
      </div>
    );
  }
});
