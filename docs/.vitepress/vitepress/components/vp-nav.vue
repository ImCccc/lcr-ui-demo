<script setup lang="ts">
/*
  最顶上的导航栏组件（指南，组件导航）
*/
import { useSidebar } from '../composables/sidebar'
import VPNavbarMenu from './navbar/vp-menu.vue'
// import VPNavbarTranslation from './navbar/vp-translation.vue'
import VPNavbarSocialLinks from './navbar/vp-social-links.vue'

defineEmits(['toggle'])
const { hasSidebar } = useSidebar()
</script>

<template>
  <header :class="{ navbar: true, 'has-sidebar': hasSidebar }">
    <div class="navbar-wrapper">
      <div class="header-container">
        <div class="content">
          <!-- 搜索栏 -->
          <!-- <VPNavbarSearch class="search" :options="theme.agolia" multilang /> -->
          <!-- 导航栏 -->
          <VPNavbarMenu class="menu" />
          <!-- 语言切换 -->
          <!-- <VPNavbarTranslation class="translation" /> -->
          <!-- github -->
          <VPNavbarSocialLinks class="social-links" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);
  > a {
    height: 28px;
    width: 128px;
  }
  .logo {
    position: relative;
    height: 100%;
  }
}
.dark {
  .logo {
    filter: drop-shadow(2px 2px 6px #409eff);
  }
}
</style>
