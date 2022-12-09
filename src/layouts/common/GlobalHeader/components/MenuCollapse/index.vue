<template>
  <HoverContainer class="w-[40px] h-full" @on-click="app.toggleMenuCollapse">
    <Collapse v-if="app.menuCollapse" />
    <Expand v-else />
  </HoverContainer>
</template>

<script lang="tsx">
export default {
  name: 'MenuCollapse'
};
</script>

<script setup lang="tsx">
import { h } from 'vue';
import { useAppStore } from '@/stores';
import { Icon } from '@iconify/vue';
import HoverContainer from '@/components/common/HoverContainer.vue';

interface IProps {
  size?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  size: '18'
});

const Collapse = () =>
  h(Icon, {
    icon: 'line-md:menu-unfold-right',
    width: props.size,
    height: props.size
  });

const Expand = () =>
  h(Icon, {
    icon: 'line-md:menu-fold-left',
    width: props.size,
    height: props.size
  });

const app = useAppStore();
</script>

<style lang="scss" scoped></style>
