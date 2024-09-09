<script setup lang="ts">
/*
  遮罩层组件
*/
defineProps<{ show: boolean }>()
</script>
<template>
  <Transition name="el-fade-in">
    <div v-if="show" />
  </Transition>
</template>
