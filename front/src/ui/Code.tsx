import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Ui.Code.Props
 */
type Props = ComponentProps<"code">

/**
 * Компонент для отображения кода
 * @namespace Ui.Code
 * @param {Props} props
 * @returns {JSX.Element}
 */
export const Code: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
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
    <pre className={classes}>
      <code className="block" {...props}>
        {children}
      </code>
    </pre>
  )
}
