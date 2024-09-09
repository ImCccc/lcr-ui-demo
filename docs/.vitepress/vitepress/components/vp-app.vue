<script setup lang="ts">
/*
  入口组件
*/
import { onMounted } from 'vue'
import nprogress from 'nprogress'
import { isClient, useToggle } from '@vueuse/core'
import { useSidebar } from '../composables/sidebar'
import VPOverlay from './vp-overlay.vue'
import VPNav from './vp-nav.vue'
import VPSubNav from './vp-subnav.vue'
import VPSidebar from './vp-sidebar.vue'
import VPContent from './vp-content.vue'

const [isSidebarOpen, toggleSidebar] = useToggle(false)
const { hasSidebar } = useSidebar()

onMounted(async () => {
  if (!isClient) return
  window.addEventListener(
    'click',
    (e) => {
      const link = (e.target as HTMLElement).closest('a')
      if (!link) return

      const { protocol, hostname, pathname, target } = link
      const currentUrl = window.location
      const extMatch = pathname.match(/\.\w+$/)
      if (
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        target !== `_blank` &&
        protocol === currentUrl.protocol &&
        hostname === currentUrl.hostname &&
        !(extMatch && extMatch[0] !== '.html')
      ) {
        e.preventDefault()
        if (pathname !== currentUrl.pathname) {
          nprogress.start()
        }
      }
    },
    { capture: true }
  )
  navigator?.serviceWorker?.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
})
</script>

<template>
  <div class="App">
    <!-- 页面宽度过少，会隐藏左侧导航栏，显示VPSubNav，显示的时候需要遮罩层 -->
    <VPOverlay
      class="overlay"
      :show="isSidebarOpen"
      @click="toggleSidebar(false)"
    />

    <!-- 上面的导航栏 -->
    <VPNav />

    <!-- 页面宽度过少，会隐藏左侧导航栏，显示VPSubNav， -->
    <VPSubNav
      v-if="hasSidebar"
      :is-sidebar-open="isSidebarOpen"
      @open-menu="toggleSidebar(true)"
    />

    <!-- 左侧导航栏 -->
    <VPSidebar :open="isSidebarOpen" @close="toggleSidebar(false)">
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </VPSidebar>
    <!-- 具体内容 -->
    <VPContent :is-sidebar-open="isSidebarOpen">
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-mid>
        <slot name="aside-mid" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </VPContent>
  </div>
</template>
