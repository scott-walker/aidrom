import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы компонента для отображения кода
 * @namespace Ui.Code.Props
 */
type Props = ComponentProps<"pre">

/**
 * Компонент для отображения кода
 * @namespace Ui.Code
 * @param {Props} props.children - контент
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Code: FC<Props> = ({ children, className = "", ...props }: Props): ReactNode => {
  const classes = cn(
    "p-6",
    "bg-foreground-accent/2",
    "text-foreground",
    "font-family-mono",
    "text-base",
    "rounded-2xl",
    className
  )

  return (
    <pre className={classes} {...props}>
      <code>{children}</code>
    </pre>
  )
}
