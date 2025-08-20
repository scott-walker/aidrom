import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Header.Props
 */
type Props = ComponentProps<"header">

/**
 * Шапка (основной компонент)
 * @namespace Layouts.Lucent.Header
 * @returns {JSX.Element}
 */
export const Header: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <header className={cn("flex items-center justify-between px-10 py-6", className)} {...props}>
      {children}
    </header>
  )
}
