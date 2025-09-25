import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы тела макета
 * @namespace Widgets.LayoutBody.Props
 */
interface LayoutBodyProps {
  children: ReactNode
  className?: string
}

/**
 * Тело макета
 * @namespace Widgets.LayoutBody
 */
export const LayoutBody = ({ children, className = "" }: LayoutBodyProps): ReactNode => {
  const classes = makeClasses(
    "h-[calc(100vh-var(--layout-header-height))]",
    "w-full",
    "scrollbar-hide",
    "overflow-y-auto",
    className
  )

  return <div className={classes}>{children}</div>
}
