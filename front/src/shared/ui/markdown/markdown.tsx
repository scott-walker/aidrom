import ReactMarkdown from "react-markdown"
import { Typography } from "@ui/typography"
import { MarkdownEditor } from "./editor"

/**
 * Пропсы компонента для отображения Markdown
 * @namespace Shared.UI.Markdown.Props
 */
type Props = {
  children: string
  editable?: boolean
}

/**
 * Компонент для отображения Markdown
 * @namespace Shared.UI.Markdown
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Markdown = ({ children, editable = false }: Props) => {
  return (
    <Typography>
      {editable ? <MarkdownEditor>{children}</MarkdownEditor> : <ReactMarkdown>{children}</ReactMarkdown>}
    </Typography>
  )
}
