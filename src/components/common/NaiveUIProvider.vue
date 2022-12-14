<template>
  <n-config-provider
    class="h-full"
    :locale="zhTW"
    :data-locale="dateZhTW"
    :preflight-style-disable="true"
    :theme="theme.naiveTheme"
  >
    <n-loading-bar-provider>
      <n-notification-provider>
        <slot></slot>
        <NaiveContentProvider />
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { h, defineComponent } from 'vue';
import {
  NConfigProvider,
  NLoadingBarProvider,
  NNotificationProvider,
  zhTW,
  dateZhTW,
  useLoadingBar,
  useNotification
} from 'naive-ui';
import { useThemeStore } from '@/stores';

const theme = useThemeStore();

const NaiveContentProvider = defineComponent({
  name: 'NaiveContentProvider',
  setup() {
    window.$loadingBar = useLoadingBar();
    window.$notify = useNotification();

    return () => h('div');
  }
});
</script>

<style scoped></style>
