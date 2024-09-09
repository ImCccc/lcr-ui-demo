<script setup lang="ts">
/*
  组件是当左侧菜单栏隐藏，显示的次要菜单栏
*/
import { useSidebar } from '../composables/sidebar'
import { useBackTop } from '../composables/back-top'

defineProps<{ isSidebarOpen: boolean }>()
defineEmits(['open-menu'])

const { hasSidebar } = useSidebar()
const { shouldShow, scrollToTop } = useBackTop()
</script>

<template>
  <div class="sub-nav py-3 flex items-center">
    <button
      v-if="hasSidebar"
      :aria-expanded="isSidebarOpen"
      class="reset-btn sidebar-button flex items-center"
      @click="$emit('open-menu')"
    >
      <span class="leading-6">点击显示菜单</span>
    </button>
    <Transition name="shifting">
      <ElButton
        link
        :class="{ 'go-back-top height-5': true, show: shouldShow }"
        @click.prevent.stop="scrollToTop"
      >
        返回最上面
      </ElButton>
    </Transition>
  </div>
</template>

<style>
.sidebar-button {
  cursor: pointer;
  color: var(--text-color);
}

.sidebar-button .icon {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
}
</style>
