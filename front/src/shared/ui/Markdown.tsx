import ReactMarkdown from "react-markdown"
import { Typography } from "@ui/typography"

/**
 * Пропсы компонента для отображения Markdown
 * @namespace Shared.UI.Markdown.Props
 */
type Props = {
  children: string
}

/**
 * Компонент для отображения Markdown
 * @namespace Shared.UI.Markdown
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Markdown = ({ children }: Props) => {
  return (
    <Typography>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Typography>
  )
}
