<template>
  <HoverContainer
    class="w-[40px] h-full"
    content="深色模式"
    @on-click="toggleThemeMode"
  >
    <Moon v-if="theme.darkMode" />
    <Sun v-else />
  </HoverContainer>
</template>

<script lang="tsx">
export default {
  name: 'ThemeMode'
};
</script>

<script setup lang="tsx">
import { h } from 'vue';
import { useThemeStore } from '@/stores';
import { Icon } from '@iconify/vue';
import HoverContainer from '@/components/common/HoverContainer.vue';

interface IProps {
  size?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  size: '18'
});

const Sun = () =>
  h(Icon, {
    icon: 'mdi:white-balance-sunny',
    width: props.size,
    height: props.size
  });

const Moon = () =>
  h(Icon, {
    icon: 'mdi:moon-waning-crescent',
    width: props.size,
    height: props.size
  });

const theme = useThemeStore();

function toggleThemeMode() {
  theme.setDarkMode(!theme.darkMode);
}
</script>

<style scoped></style>
