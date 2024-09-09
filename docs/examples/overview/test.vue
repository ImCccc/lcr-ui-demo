<template>
  <div>
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      link
      disabled
    >
      {{ button.text }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
const buttons = [{ type: 'danger', text: 'danger' }] as const
</script>
