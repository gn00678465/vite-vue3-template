<template>
  <n-loading-bar-provider>
    <slot></slot>
    <NaiveContentProvider />
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { h, defineComponent } from 'vue';
import { useLoadingBar, NLoadingBarProvider } from 'naive-ui';

const NaiveContentProvider = defineComponent({
  name: 'NaiveContentProvider',
  setup() {
    window.$loading = useLoadingBar();

    return () => h('div');
  }
});
</script>

<style scoped></style>
