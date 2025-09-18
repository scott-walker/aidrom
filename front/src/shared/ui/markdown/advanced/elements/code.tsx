import type { ReactNode } from "react"

/**
 * Компонент для отображения кода
 * @namespace Shared.UI.DeepSeekMarkdown.Code
 */
type Props = {
  children: ReactNode
  className?: string
  inline?: boolean
}

/**
 * Компонент для отображения кода
 * @namespace Shared.UI.DeepSeekMarkdown.Code
 */
export const Code = ({ children, className, inline, ...props }: Props) => {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  return (
    <div className="code-block">
      {language && <div className="code-block__language">{language}</div>}

      <pre className={className}>
        <code {...props}>{children}</code>
      </pre>
    </div>
  )
}
