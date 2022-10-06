<script setup lang="ts">
import { NConfigProvider, zhTW, dateZhTW } from 'naive-ui';
import { useThemeStore } from '@/stores';

const theme = useThemeStore();
</script>

<template>
  <n-config-provider
    class="h-full"
    :locale="zhTW"
    :data-locale="dateZhTW"
    :preflight-style-disable="true"
    :theme="theme.naiveTheme"
  >
    <RouterView />
  </n-config-provider>
</template>

<style scoped></style>
