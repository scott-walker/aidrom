import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Body.Props
 */
type Props = ComponentProps<"div">

/**
 * Тело (основной компонент)
 * @namespace Layouts.Lucent.Body
 * @returns {JSX.Element}
 */
export const Body: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}
