import { defineComponent, computed, nextTick, reactive, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { ButtonTab, ChromeTab } from '@soybeanjs/vue-admin-tab';
import { Icon } from '@iconify/vue';
import { useTabStore, useThemeStore } from '@/stores';

export default defineComponent({
  name: 'TabDetail',
  props: {},
  setup() {
    const tabRef: Ref<HTMLElement | null> = ref(null);

    const tab = useTabStore();
    const theme = useThemeStore();

    const isChromeMode = computed(() => theme.tab.mode === 'chrome');
    const ActiveComponent = computed(() =>
      isChromeMode.value ? ChromeTab : ButtonTab
    );

    return () => (
      <div ref={tabRef} class="h-full">
        {tab.tabs.map((item, index) => {
          return (
            <ActiveComponent.value
              key={item.fullPath}
              isActive={tab.activeTab === item.fullPath}
              closable={!(item.name === tab.homeTab.name)}
              onClick={() => tab.handleClickTab(item.fullPath)}
              onClose={() => tab.removeTab(item.fullPath)}
            >
              <Icon
                class="inline-block align-text-bottom mr-1 text-base"
                icon={item.meta.icon}
              />
              {item.meta.title}
            </ActiveComponent.value>
          );
        })}
      </div>
    );
  }
});
