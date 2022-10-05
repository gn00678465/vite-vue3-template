<script setup lang="ts">
import { NConfigProvider, zhTW, dateZhTW } from 'naive-ui';
</script>

<template>
  <n-config-provider
    class="h-full"
    :locale="zhTW"
    :data-locale="dateZhTW"
    :preflight-style-disable="true"
  >
    <RouterView />
  </n-config-provider>
</template>

<style scoped></style>
