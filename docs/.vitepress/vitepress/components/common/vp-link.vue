<script setup lang="ts">
// 链接导航组件
import { isExternal } from '../../utils'
defineProps<{ href?: string; noIcon?: boolean }>()
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    class="link-item"
    :class="{ link: href }"
    :href="href"
    :target="isExternal(href) ? '_blank' : undefined"
    :rel="isExternal(href) ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.link-item {
  display: flex;
  align-items: center;
}

.el-icon {
  margin-left: 4px;
}
</style>
