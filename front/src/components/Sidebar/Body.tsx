import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы тела сайдбара
 * @namespace Components.Sidebar.Body.Props
 */
type Props = ComponentProps<"div">

/**
 * Тело сайдбара
 * @namespace Components.Sidebar.Body
 * @param {Props} props.children - контент
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Body: FC<Props> = ({ children, className = "", ...props }: Props): ReactNode => {
  const classes = cn("flex", "flex-col", "flex-1", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
