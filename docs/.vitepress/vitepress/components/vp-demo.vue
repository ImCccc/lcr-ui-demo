<script setup lang="ts">
/*
  显示组件例子地方，包括组件的显示效果，组件源码等功能
*/

import { computed, getCurrentInstance, ref } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { CaretTop } from '@element-plus/icons-vue'
import SourceCode from './demo/vp-source-code.vue'

const props = defineProps<{
  path: string
  source: string // 源码
  rawSource: string // 编码后的组件源码
  description: string // 描述
}>()

const vm = getCurrentInstance()!
const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, toggleSourceVisible] = useToggle()
const sourceCodeRef = ref<HTMLButtonElement>()
const decodedDescription = computed(() => decodeURIComponent(props.description))

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('此浏览器不支持自动复制')
  }
  try {
    await copy()
    $message.success('复制成功')
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<template>
  <!-- 组件的描述信息 -->
  <div text="sm" m="y-4" v-html="decodedDescription" />
  <div class="example">
    <!-- 组件的显示效果 -->
    <div class="example-showcase">
      <slot name="source" />
    </div>
    <ElDivider class="m-0" />
    <!-- 显示源码，复制代码的操作 icon -->
    <div class="op-btns">
      <ElTooltip
        content="复制代码"
        :show-arrow="false"
        :trigger="['hover', 'focus']"
        :trigger-keys="[]"
      >
        <ElIcon
          :size="16"
          aria-label="复制代码"
          class="op-btn"
          tabindex="0"
          role="button"
          @click="copyCode"
          @keydown.prevent.enter="copyCode"
          @keydown.prevent.space="copyCode"
        >
          <i-ri-file-copy-line />
        </ElIcon>
      </ElTooltip>
      <ElTooltip
        content="显示源码"
        :show-arrow="false"
        :trigger="['hover', 'focus']"
        :trigger-keys="[]"
      >
        <button
          ref="sourceCodeRef"
          :aria-label="sourceVisible ? `隐藏源码` : `显示源码`"
          class="reset-btn el-icon op-btn"
          @click="toggleSourceVisible()"
        >
          <ElIcon :size="16">
            <i-ri-code-line />
          </ElIcon>
        </button>
      </ElTooltip>
    </div>
    <!-- 源码显示的地方 -->
    <ElCollapseTransition>
      <SourceCode :visible="sourceVisible" :source="source" />
    </ElCollapseTransition>
    <!-- 隐藏源码 icon -->
    <Transition name="el-fade-in-linear">
      <div
        v-show="sourceVisible"
        class="example-float-control"
        tabindex="0"
        role="button"
        @click="toggleSourceVisible(false)"
        @keydown="onSourceVisibleKeydown"
      >
        <ElIcon :size="16"><CaretTop /></ElIcon>
        <span>隐藏源码</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

  .example-showcase {
    padding: 1.5rem;
    margin: 0.5px;
    background-color: var(--bg-color);
  }

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
