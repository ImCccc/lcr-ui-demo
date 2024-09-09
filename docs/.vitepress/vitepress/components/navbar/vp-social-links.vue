<script setup lang="ts">
// 顶部右上角的 github
const github = {
  link: 'https://github.com/element-plus/element-plus',
  text: 'GitHub',
}
</script>

<template>
  <a
    :href="github.link"
    :title="github.text"
    target="_blank"
    class="social-link"
  >
    GitHub
  </a>
</template>

<style scoped lang="scss">
.social-links {
  padding: 0 12px;
}
.social-link {
  color: var(--text-color);
}
</style>
