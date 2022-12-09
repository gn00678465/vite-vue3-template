<script lang="tsx">
export default {
  name: 'FullScreen'
};
</script>

<script lang="tsx" setup>
import { h } from 'vue';
import { Icon } from '@iconify/vue';
import { useFullscreen } from '@vueuse/core';
import HoverContainer from '@/components/common/HoverContainer.vue';

const { isFullscreen, toggle } = useFullscreen();

interface IProps {
  size?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  size: '18'
});

const Maximize = () =>
  h(Icon, {
    icon: 'fluent:full-screen-maximize-24-filled',
    width: props.size,
    height: props.size
  });

const Minimize = () =>
  h(Icon, {
    icon: 'fluent:full-screen-minimize-16-filled',
    width: props.size,
    height: props.size
  });
</script>

<template>
  <HoverContainer class="w-[40px] h-full" content="全螢幕" @on-click="toggle">
    <Maximize v-if="!isFullscreen" />
    <Minimize v-else />
  </HoverContainer>
</template>
