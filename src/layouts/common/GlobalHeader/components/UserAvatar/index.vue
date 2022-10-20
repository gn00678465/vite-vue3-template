<script setup lang="ts">
import { computed } from 'vue';
import { NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
import HoverContainer from '@/components/common/HoverContainer.vue';
import { useRenderIcon } from '@/composables';

defineOptions({ name: 'UserAvatar' });

const options = computed<DropdownOption[]>(() => [
  {
    label: 'Profile',
    key: 'profile',
    icon: useRenderIcon({ icon: 'mdi:account-circle' })
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: useRenderIcon({ icon: 'mdi:logout' })
  }
]);
</script>

<template>
  <NDropdown :options="options">
    <HoverContainer class="flex items-center gap-x-2 px-3">
      <icon-custom-users class="text-2xl" />
      <span class="font-medium text-base">Admin</span>
    </HoverContainer>
  </NDropdown>
</template>
