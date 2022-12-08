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
      <div class="flex items-center  w-full pl-4 shadow-tab pt-1">
        <div class="flex-1 overflow-hidden h-full">
          <Tabs />
        </div>
        <ReloadButton />
      </div>
    );
  }
});
