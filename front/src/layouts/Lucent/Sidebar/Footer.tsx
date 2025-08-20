import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Sidebar.Footer.Props
 */
type Props = ComponentProps<"footer">

/**
 * Футер сайдбара
 * @namespace Layouts.Lucent.Sidebar.Footer
 * @returns {JSX.Element}
 */
export const Footer: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <footer className={cn("p-10", className)} {...props}>
      {children}
    </footer>
  )
}
