<template>
  <n-config-provider
    class="h-full"
    :locale="getNaiveLocale"
    :data-locale="getNaiveDateLocale"
    :preflight-style-disable="true"
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
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
import { h, defineComponent, computed } from 'vue';
import {
  NConfigProvider,
  NLoadingBarProvider,
  NNotificationProvider,
  zhTW,
  enUS,
  dateZhTW,
  dateEnUS,
  useLoadingBar,
  useNotification
} from 'naive-ui';
import { useThemeStore } from '@/stores';
import { useI18n } from 'vue-i18n';

const theme = useThemeStore();
const { locale } = useI18n();

const getNaiveLocale = computed(() => {
  switch (locale.value) {
    case 'en-US':
      return enUS;
    default:
      return zhTW;
  }
});

const getNaiveDateLocale = computed(() => {
  switch (locale.value) {
    case 'en-US':
      return dateEnUS;
    default:
      return dateZhTW;
  }
});

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
