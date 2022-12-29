<script lang="ts">
export default {
  name: 'LoadingEmptyWrapper'
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { NSpin } from 'naive-ui';
import { useI18n } from '@/hooks';

interface Props {
  loading: boolean;
  empty?: boolean;
  loadingSize?: 'small' | 'medium' | 'large';
  iconClass?: string;
  emptyDesc?: string;
  descClass?: string;
  height?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  empty: false,
  loadingSize: 'medium',
  iconClass: 'text-primary text-[320px]',
  emptyDesc: '',
  descClass: 'text-base text-[#666]',
  height: 'auto'
});

const { t } = useI18n();

const isEmpty = computed(() => props.empty && !props.loading);

const containerHeight = computed<string>(() => {
  if (typeof props.height === 'number') return props.height + 'px';
  return props.height;
});
</script>

<template>
  <div class="relative" :style="{ minHeight: containerHeight, height: '100%' }">
    <slot></slot>
    <div
      v-show="loading"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <NSpin :show="true" :size="loadingSize" />
    </div>
    <div
      v-show="isEmpty"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div class="relative">
        <icon-custom-empty-data :class="iconClass" />
        <p
          class="absolute bottom-0 left-0 w-full text-center"
          :class="descClass"
        >
          {{ emptyDesc || t('sys.empty_describe') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
