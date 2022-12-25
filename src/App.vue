<script setup lang="ts">
import NaiveUIProvider from './components/common/NaiveUIProvider.vue';
import { subscribeThemeStore } from './stores';

subscribeThemeStore();
</script>

<template>
  <NaiveUIProvider>
    <RouterView />
  </NaiveUIProvider>
</template>

<style scoped></style>
