<script setup lang="ts">
// 最顶上导航栏
import { useNav } from '../../composables/nav'
import VPMenuLink from './vp-menu-link.vue'

const navs = useNav()
</script>

<template>
  <nav v-if="navs" class="navbar-menu">
    <VPMenuLink v-for="(item, key) in navs" :key="key" :item="item" />
  </nav>
</template>
