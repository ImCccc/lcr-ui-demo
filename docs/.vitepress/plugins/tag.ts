/*
  在 md 文档上版本显示的插件，在 md上 ^(2.2.0) 这样的文本
*/
import type MarkdownIt from 'markdown-it'
export default (md: MarkdownIt): void => {
  md.inline.ruler.before('emphasis', 'tag', (state, silent) => {
    const tagRegExp = /^\^\(([^)]*)\)/
    const str = state.src.slice(state.pos, state.posMax)

    if (!tagRegExp.test(str)) return false
    if (silent) return true

    const result = str.match(tagRegExp)

    if (!result) return false

    const token = state.push('html_inline', '', 0)
    const value = result[1].trim()
    const tagClass = ['beta', 'deprecated', 'a11y', 'required'].includes(value)
      ? value
      : ''
    token.content = `<span class="vp-tag ${tagClass}">${value}</span>`
    token.level = state.level
    state.pos += result[0].length

    return true
  })
}
