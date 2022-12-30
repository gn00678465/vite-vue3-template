<template>
  <HoverContainer
    className="w-[64px] h-full"
    content="重整"
    placement="bottom"
    @click="handleRefresh"
  >
    <Icon
      icon="mdi:refresh"
      class="text-[22px]"
      :class="loading && 'animate-spin'"
    ></Icon>
  </HoverContainer>
</template>

<script lang="ts">
export default {
  name: 'ReloadButton'
};
</script>

<script setup lang="ts">
import HoverContainer from '@/components/common/HoverContainer.vue';
import { Icon } from '@iconify/vue';
import { useAppStore } from '@/stores';
import { useBoolean } from '@/hooks';
import { useTimeoutFn } from '@vueuse/core';

const {
  bool: loading,
  setTrue: loadingStart,
  setFalse: loadingEnd
} = useBoolean(false);

const app = useAppStore();

function handleRefresh() {
  loadingStart();
  app.reloadPage();
  useTimeoutFn(loadingEnd, 1000);
}
</script>

<style scoped></style>
