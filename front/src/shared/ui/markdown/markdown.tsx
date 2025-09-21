import { type ReactNode } from "react"
import { AdvancedMarkdownReader } from "./advanced"
import { MarkdownEditor } from "./editor"
import { MarkdownReader } from "./reader"

/**
 * Пропсы компонента для отображения Markdown
 * @namespace Shared.UI.Markdown.Props
 */
type Props = {
  value?: string
  children?: ReactNode
  editable?: boolean
  advanced?: boolean
  onChange?: (value: string) => void
  [key: string]: unknown
}

/**
 * Компонент для отображения Markdown
 * @namespace Shared.UI.Markdown
 */
export const Markdown = ({
  value,
  children,
  editable = false,
  advanced = false,
  onChange = () => {},
  ...props
}: Props) => {
  value = value ?? children?.toString().trim() ?? ""

  if (editable) {
    return <MarkdownEditor {...props} value={value} onChange={onChange} />
  }
  if (advanced) {
    return <AdvancedMarkdownReader {...props} value={value} />
  }

  return <MarkdownReader {...props} value={value} />
}
