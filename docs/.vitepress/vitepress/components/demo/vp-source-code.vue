<script setup lang="ts">
// vp-demo.vue 中使用到，显示源码的组件
import { computed } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})
</script>

<template>
  <div v-show="visible" class="example-source-wrapper">
    <div class="example-source" v-html="decoded" />
  </div>
</template>

<style scoped lang="scss">
:deep(.language-vue) {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
