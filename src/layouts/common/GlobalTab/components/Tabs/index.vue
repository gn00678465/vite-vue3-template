<template>
  <div ref="tabRef" class="h-full">
    <ActiveComponent
      v-for="item of tab.tabs"
      :key="item.fullPath"
      :is-active="tab.activeTab === item.fullPath"
      :primary-color="theme.themeColor"
      :dark-mode="theme.darkMode"
      :closable="!(item.name === tab.homeTab.name)"
      @click="() => tab.handleClickTab(item.fullPath)"
      @close="() => tab.removeTab(item.fullPath)"
    >
      <Icon
        class="inline-block align-text-bottom mr-1 text-base"
        :icon="(item.meta.icon as string)"
      />
      {{ item.meta.title }}
    </ActiveComponent>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TabDetail'
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { ButtonTab, ChromeTab } from '@soybeanjs/vue-admin-tab';
import { Icon } from '@iconify/vue';
import { useTabStore, useThemeStore } from '@/stores';

const tabRef: Ref<HTMLElement | null> = ref(null);

const tab = useTabStore();
const theme = useThemeStore();

const isChromeMode = computed(() => theme.tab.mode === 'chrome');
const ActiveComponent = computed(() =>
  isChromeMode.value ? ChromeTab : ButtonTab
);
</script>

<style scoped></style>
