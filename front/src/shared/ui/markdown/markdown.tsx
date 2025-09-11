import { MarkdownEditor } from "./editor"
import { MarkdownReader } from "./reader"

/**
 * Пропсы компонента для отображения Markdown
 * @namespace Shared.UI.Markdown.Props
 */
type Props = {
  value: string | undefined | null
  editable?: boolean
  onChange?: (value: string) => void
  [key: string]: unknown
}

/**
 * Компонент для отображения Markdown
 * @namespace Shared.UI.Markdown
 */
export const Markdown = ({ value, editable = false, onChange = () => {}, ...props }: Props) => {
  value = value ?? ""

  return (
    <>
      {editable ? (
        <MarkdownEditor {...props} value={value} onChange={onChange} />
      ) : (
        <MarkdownReader {...props} value={value} />
      )}
    </>
  )
}
