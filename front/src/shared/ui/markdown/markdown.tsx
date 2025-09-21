import { type ReactNode } from "react"
import { AdvancedMarkdownReader } from "./advanced"
import { MarkdownEditor } from "./editor"
import { MarkdownReader } from "./reader"

/**
 * Проверяет, требуется ли отображение HTML
 * @namespace Shared.UI.Markdown.isHtml
 */
const isHtml = (value: string) => {
  return value.includes("<img")
}

/**
 * Проверяет, требуется ли расширенное отображение Markdown
 * @namespace Shared.UI.Markdown.isAdvanced
 */
const isAdvanced = (value: string) => {
  return value.includes("```") || isHtml(value)
}

/**
 * Пропсы компонента для отображения Markdown
 * @namespace Shared.UI.Markdown.Props
 */
type Props = {
  value?: string
  children?: ReactNode
  editable?: boolean
  advanced?: boolean
  html?: boolean
  onChange?: (value: string) => void
  [key: string]: unknown
}

/**
 * Компонент для отображения Markdown
 * @namespace Shared.UI.Markdown
 */
export const Markdown = ({ value, children, editable = false, onChange = () => {}, ...props }: Props) => {
  value = value ?? children?.toString().trim() ?? ""

  if (editable) {
    return <MarkdownEditor {...props} value={value} onChange={onChange} />
  }
  if (isAdvanced(value)) {
    return <AdvancedMarkdownReader {...props} value={value} html={isHtml(value)} />
  }

  return <MarkdownReader {...props} value={value} />
}
