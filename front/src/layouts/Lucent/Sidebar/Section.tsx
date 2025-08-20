import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Sidebar.Section.Props
 */
type Props = ComponentProps<"section">

/**
 * Секция сайдбара
 * @namespace Layouts.Lucent.Sidebar.Section
 * @returns {JSX.Element}
 */
export const Section: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <section className={cn("flex items-center p-10", className)} {...props}>
      {children}
    </section>
  )
}
