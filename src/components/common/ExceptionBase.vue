<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="text-[400px] text-primary">
      <icon-custom-no-permission v-if="props.type === 403" />
      <icon-custom-not-found v-else-if="props.type === 404" />
      <icon-custom-service-error v-else-if="props.type === 500" />
    </div>
    <router-link :to="{ name: 'root' }">
      <NButton type="primary">回首頁</NButton>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';

defineOptions({ name: 'ExceptionBase' });

type ErrorType = 403 | 404 | 500;

interface IProps {
  type: ErrorType;
}

const props = defineProps<IProps>();
</script>

<style scoped></style>
