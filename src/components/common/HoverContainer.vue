<template>
  <div v-if="showTooltip">
    <NTooltip trigger="hover" :placement="placement">
      <template #trigger>
        <div
          class="h-full flex items-center justify-center cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]"
          :class="props.className"
          @click="() => emit('on-click')"
        >
          <slot></slot>
        </div>
      </template>
      <template #default>
        {{ props.content }}
      </template>
    </NTooltip>
  </div>
  <div
    v-else
    class="h-full flex items-center justify-center cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]"
    :class="props.className"
    @click="() => emit('on-click')"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NTooltip } from 'naive-ui';
import type { PopoverPlacement } from 'naive-ui';

defineOptions({
  name: 'HoverContainer'
});

interface IProps {
  content?: string;
  placement?: PopoverPlacement;
  className?: string;
  inverted?: boolean;
}

interface IEmits {
  (e: 'on-click'): void;
}

const props = withDefaults(defineProps<IProps>(), {
  content: '',
  placement: 'bottom',
  className: '',
  inverted: false
});

const emit = defineEmits<IEmits>();

const showTooltip = computed(() => Boolean(props.content));
</script>

<style lang="scss" scoped></style>
