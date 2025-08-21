import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы шапки сайдбара
 * @namespace Components.Sidebar.Header.Props
 */
type Props = ComponentProps<"header">

/**
 * Шапка сайдбара
 * @namespace Components.Sidebar.Header
 * @param {Props} props.children - контент
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Header: FC<Props> = ({ children, className = "", ...props }: Props): ReactNode => {
  const classes = cn("flex", "items-center", "justify-center", className)

  return (
    <header className={classes} {...props}>
      {children}
    </header>
  )
}
