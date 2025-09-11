import ReactMarkdown from "react-markdown"
import { Typography } from "@ui/typography"

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
    <Typography>
      <ReactMarkdown {...props}>{value}</ReactMarkdown>
    </Typography>
  )
}
