import type { ReactNode } from "react"

/**
 * Компонент для отображения прешки
 * @namespace Shared.UI.DeepSeekMarkdown.Pre
 */
type Props = {
  children: ReactNode
}

/**
 * Компонент для отображения прешки
 * @namespace Shared.UI.DeepSeekMarkdown.Pre
 */
export const Pre = ({ children }: Props) => {
  return <div className="code-wrapper">{children}</div>
}
