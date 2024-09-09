<script setup lang="ts">
/*
  布局组件，所有的界面都是使用该组件，包括首页
*/
import { nextTick, onUpdated, ref, watch } from 'vue'
import nprogress from 'nprogress'
import { useSidebar } from '../composables/sidebar'
import VPDocContent from './vp-doc-content.vue'
const { hasSidebar } = useSidebar()
const props = defineProps<{ isSidebarOpen: boolean }>()
const shouldUpdateProgress = ref(true)

watch(
  () => props.isSidebarOpen,
  (val) => {
    nextTick(() => {
      shouldUpdateProgress.value = !val
    })
  }
)

onUpdated(() => {
  if (shouldUpdateProgress.value) {
    nprogress.done()
  }
})
</script>

<template>
  <main
    id="page-content"
    :class="{ 'page-content': true, 'has-sidebar': hasSidebar }"
  >
    <!-- 文档的内容组件 -->
    <VPDocContent>
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
    </VPDocContent>
  </main>
</template>
