<script setup lang="ts">
import { computed } from 'vue';
import { NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
import HoverContainer from '@/components/common/HoverContainer.vue';
import { useRenderIcon } from '@/composables';
import { useAuthStore } from '@/stores';
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'UserAvatar' });

const { userInfo, resetAuthStore, handleLogout } = useAuthStore();

const { t } = useI18n();

const options = computed<DropdownOption[]>(() => [
  {
    label: t('profile'),
    key: 'profile',
    icon: useRenderIcon({ icon: 'mdi:account-circle' })
  },
  {
    label: t('logout'),
    key: 'logout',
    icon: useRenderIcon({ icon: 'mdi:logout' }),
    props: {
      onClick() {
        window.$swalDialog
          .create({
            title: '是否要退出登錄?',
            showCloseButton: true,
            showCancelButton: true
          })
          .then(({ isConfirmed }) => {
            if (isConfirmed) {
              handleLogout()?.then(() => {
                resetAuthStore();
              });
            }
          });
      }
    }
  }
]);
</script>

<template>
  <NDropdown :options="options">
    <HoverContainer class="flex items-center gap-x-2 px-3">
      <icon-custom-users class="text-2xl" />
      <span class="font-medium text-base">{{ userInfo.Username }}</span>
    </HoverContainer>
  </NDropdown>
</template>
