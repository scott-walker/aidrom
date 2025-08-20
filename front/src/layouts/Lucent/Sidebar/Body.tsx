import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Sidebar.Body.Props
 */
type Props = ComponentProps<"div">

/**
 * Тело сайдбара
 * @namespace Layouts.Lucent.Sidebar.Body
 * @returns {JSX.Element}
 */
export const Body: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <div className={cn("flex-1 flex flex-col", className)} {...props}>
      {children}
    </div>
  )
}
