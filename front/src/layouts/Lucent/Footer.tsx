import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Footer.Props
 */
type Props = ComponentProps<"footer">

/**
 * Футер (основной компонент)
 * @namespace Layouts.Lucent.Footer
 * @returns {JSX.Element}
 */
export const Footer: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <footer className={cn("px-10 py-6", className)} {...props}>
      {children}
    </footer>
  )
}
