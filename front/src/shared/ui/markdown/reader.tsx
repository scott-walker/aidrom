import ReactMarkdown from "react-markdown"

/**
 * Пропсы компонента для отображения Markdown
 * @namespace Shared.UI.Markdown.Reader.Props
 */
type Props = {
  value: string | undefined | null
  [key: string]: unknown
}

/**
 * Компонент для отображения Markdown
 * @namespace Shared.UI.Markdown.Reader
 */
export const MarkdownReader = ({ value, ...props }: Props) => {
  value = value ?? ""

  return (
    <div className="typography-container">
      <ReactMarkdown {...props}>{value}</ReactMarkdown>
    </div>
  )
}
