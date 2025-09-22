import type { ReactNode } from "react"
import classes from "../style.module.css"

/**
 * Компонент для отображения кода
 * @namespace Shared.UI.DeepSeekMarkdown.Code
 */
type Props = {
  children: ReactNode
  className?: string
  node: {
    position: {
      start: {
        line: number
      }
      end: {
        line: number
      }
    }
  }
}

/**
 * Компонент для отображения кода
 * @namespace Shared.UI.DeepSeekMarkdown.Code
 */
export const Code = ({ children, className, node, ...props }: Props) => {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""
  const inline = node.position.start.line === node.position.end.line

  if (inline) {
    return (
      <code className={classes["code-inline"] + " " + className} {...props}>
        {children}
      </code>
    )
  }

  return (
    <div className={classes["code-block"] + " " + className}>
      {language && <div className={classes["code-block-language"]}>{language}</div>}

      <pre className={className}>
        <code {...props}>{children}</code>
      </pre>
    </div>
  )
}
