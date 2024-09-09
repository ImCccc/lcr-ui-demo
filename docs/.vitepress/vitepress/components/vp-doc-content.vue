<script lang="ts" setup>
import VPPageNav from './doc-content/vp-page-nav.vue'
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <!-- Content 组件显示渲染的 markdown 内容 -->
      <Content class="doc-content" />
      <!-- 上一页和下一页 -->
      <VPPageNav />
    </div>
  </div>
</template>
