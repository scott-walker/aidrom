import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы футера
 * @namespace Components.Sidebar.Footer.Props
 */
type Props = ComponentProps<"footer">

/**
 * Футер сайдбара
 * @namespace Components.Sidebar.Footer
 * @returns {ReactNode}
 */
export const Footer: FC<Props> = ({ children, className = "", ...props }: Props): ReactNode => {
  const classes = cn("flex", "items-center", "justify-center", className)

  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  )
}
