import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы шапки
 * @namespace Layouts.Lucent.Header.Props
 */
type Props = ComponentProps<"header">

/**
 * Шапка макета
 * @namespace Layouts.Lucent.Header
 * @returns {ReactNode}
 */
export const Header: FC<Props> = ({ children, className, ...props }: Props): ReactNode => {
  const classesHeader = cn("px-6", "h-20", "w-full", "border-b-1", "border-brand/4", className)
  const classesInner = cn("flex", "items-center", "gap-4", "h-full")

  return (
    <header className={classesHeader} {...props}>
      <div className={classesInner}>{children}</div>
    </header>
  )
}
