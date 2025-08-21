import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы секции
 * @namespace Components.Sidebar.Section.Props
 */
type Props = ComponentProps<"section">

/**
 * Секция сайдбара
 * @namespace Components.Sidebar.Section
 * @returns {ReactNode}
 */
export const Section: FC<Props> = ({ children, className = "", ...props }: Props): ReactNode => {
  const classes = cn("flex", "flex-col", className)

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  )
}
