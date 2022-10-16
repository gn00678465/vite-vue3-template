<script lang="ts">
export default {
  name: 'BasicLayout'
};
</script>

<script setup lang="ts">
import { provide, ref, useSlots, useAttrs, computed } from 'vue';
import { useElementSize, useWindowSize } from '@vueuse/core';
import type { MaybeComputedElementRef } from '@vueuse/core';
import { useLayoutStore } from '@/stores';
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider
} from 'naive-ui';

type CollapseMode = 'width' | 'transform';

interface IProps {
  inverted?: boolean;
  bordered?: boolean;
  collapsed?: boolean;
  collapseMode?: CollapseMode;
  width?: number | string;
  collapsedWidth?: number;
  showTab?: boolean;
  showFooter?: boolean;
}

interface IEmites {
  (evt: 'after-enter'): void;
  (evt: 'after-leave'): void;
  (evt: 'sider-scroll', e: Event): void;
  (evt: 'content-scroll', e: Event): void;
}

const props = withDefaults(defineProps<IProps>(), {
  inverted: false,
  bordered: true,
  collapsed: false,
  collapseMode: 'width',
  width: 272,
  collapsedWidth: 48,
  showTab: false,
  showFooter: false
});

const emits = defineEmits<IEmites>();

const slots = useSlots();
const attrs = useAttrs();

const { provideContentHeightKey } = useLayoutStore();

// dom operator
const headerRef: MaybeComputedElementRef = ref(null);
const footerRef: MaybeComputedElementRef = ref(null);
const tabRef: MaybeComputedElementRef = ref(null);

const { width: windowW, height: heightW } = useWindowSize();
const { width: headerW, height: headerH } = useElementSize(
  headerRef,
  { width: 0, height: 0 },
  { box: 'border-box' }
);
const { width: footerW, height: footerH } = useElementSize(
  footerRef,
  { width: 0, height: 0 },
  { box: 'border-box' }
);
const { width: tabW, height: tabH } = useElementSize(
  tabRef,
  { width: 0, height: 0 },
  { box: 'border-box' }
);

const contentHeight = computed<number>(() => {
  return heightW.value - headerH.value - footerH.value - tabH.value - 20;
});

provide('inverted', props.inverted);
provide(provideContentHeightKey, contentHeight);
</script>

<template>
  <NLayout position="absolute">
    <NLayout position="absolute" has-sider>
      <NLayoutSider
        v-if="slots.sider"
        class="shadow-sider z-20"
        :bordered="props.bordered"
        :inverted="props.inverted"
        :collapsed="props.collapsed"
        :collapse-mode="props.collapseMode"
        :collapsed-width="props.collapsedWidth"
        :width="props.width"
        :native-scrollbar="false"
      >
        <slot name="sider" />
      </NLayoutSider>
      <NLayoutContent>
        <NLayout :native-scrollbar="false" position="absolute">
          <NLayoutHeader
            v-if="slots.header"
            ref="headerRef"
            class="bg-white"
            :inverted="props.inverted"
          >
            <slot name="header" />
          </NLayoutHeader>
          <NLayout position="absolute" class="main-layout">
            <NLayout position="absolute">
              <NLayoutHeader v-if="props.showTab" ref="tabRef">
                <slot name="tab" />
              </NLayoutHeader>
              <NLayout
                :native-scrollbar="false"
                position="absolute"
                class="bg-gray-100"
                :class="[
                  props.showTab && 'content',
                  props.showFooter && 'footer'
                ]"
              >
                <NLayoutContent class="bg-transparent">
                  <div class="mx-4 my-2">
                    <slot name="content" />
                  </div>
                </NLayoutContent>
              </NLayout>
            </NLayout>
          </NLayout>
          <NLayoutFooter
            v-if="props.showFooter"
            ref="footerRef"
            position="absolute"
            :bordered="props.bordered"
            :inverted="props.inverted"
          >
            <slot name="footer" />
          </NLayoutFooter>
        </NLayout>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style scoped>
.main-layout {
  top: calc(v-bind(headerH) * 1px);
  margin-top: 1px;
}

.content {
  top: calc(v-bind(tabH) * 1px);
}
.footer {
  bottom: calc(v-bind(footerH) * 1px);
}
</style>
