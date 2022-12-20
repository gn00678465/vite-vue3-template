<script setup lang="ts">
import { computed } from 'vue';
import { NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
import HoverContainer from '@/components/common/HoverContainer.vue';
import { useRenderIcon } from '@/composables';
import { useAuthStore } from '@/stores';
import { useI18n, useSwal } from '@/hooks';
import { execStrategyActions, localStorage } from '@/utils';
import { useMsal } from './utils';

defineOptions({ name: 'UserAvatar' });

const { userInfo, resetAuthStore } = useAuthStore();
const { instance } = useMsal();
const { t } = useI18n();
const { createWarningSwal } = useSwal();

function handleClickLogout() {
  createWarningSwal({
    title: t('sys.question_for_logout'),
    showCloseButton: true,
    showCancelButton: true
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      const actions: Common.StrategyActions = [
        [
          localStorage.get('loginType') === 'azure',
          () => {
            console.log('azure');
            instance
              .logoutPopup({
                mainWindowRedirectUri: '/'
              })
              .then(() => {
                resetAuthStore();
              });
          }
        ]
      ];

      execStrategyActions(actions);
    }
  });
}

const options = computed<DropdownOption[]>(() => [
  {
    label: t('sys.profile'),
    key: 'profile',
    icon: useRenderIcon({ icon: 'mdi:account-circle' })
  },
  {
    label: t('sys.logout'),
    key: 'logout',
    icon: useRenderIcon({ icon: 'mdi:logout' }),
    props: {
      onClick: handleClickLogout
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
