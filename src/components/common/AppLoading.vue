<script setup lang="ts">
import { useAppInfo } from '@/composables';
import { localStorage } from '@/utils';
import { useI18n } from '@/hooks';

const { t } = useI18n();
const { title } = useAppInfo();

const loadingClasses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500'
];

function addThemeColorCssVars() {
  const defaultColor = '#1890ff';
  const themeColor = defaultColor;
  const cssVars = `--primary-color: ${themeColor}`;
  document.documentElement.style.cssText = cssVars;
}

addThemeColorCssVars();
</script>

<template>
  <div
    class="fixed left-0 top-0 flex justify-center items-center flex-col w-full h-full"
  >
    <system-logo class="text-[128px] text-primary" />
    <div class="w-[56px] h-[56px] my-[36px]">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in loadingClasses"
          :key="index"
          class="absolute w-4 h-4 bg-primary rounded-lg animate-pulse"
          :class="item"
        ></div>
      </div>
    </div>
    <h2 class="text-[28px] font-500 text-[#646464]">{{ t(title) }}</h2>
  </div>
</template>

<style scoped></style>
