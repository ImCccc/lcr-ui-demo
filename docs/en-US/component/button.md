# Button

在 md 文档中，可以直接使用 examples 文件夹下面的组件

## 基本使用

:::demo 使用“type”、“plain”、“round”和“circle”来定义 Button 的样式。

button/basic

:::

## Disabled Button

“disabled”属性决定按钮是否被禁用。

:::demo

button/disabled

:::

## Link Button

type=“text”已弃用，将在 3.0.0 中删除，请考虑切换到新的 API。

:::warning

`type="text"` 已弃用，将在 ^(3.0.0) 中删除，请考虑切换到新的 API.

:::

:::demo

button/link

:::

## Button props

| 名称          | 描述       | 类型                       | 默认值 |
| ------------- | ---------- | -------------------------- | ------ |
| size          | 大小       | ^[enum]`'large'\| 'small'` | —      |
| text ^(2.2.0) | 谢谢小星星 | ^[boolean]                 | false  |
