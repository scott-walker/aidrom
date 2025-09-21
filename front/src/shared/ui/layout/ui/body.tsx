import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы тела макета
 * @namespace Widgets.Layouts.UI.BodyProps
 */
interface BodyProps {
  children: ReactNode
  className?: string
}

/**
 * Тело макета
 * @namespace Widgets.Layouts.UI.Body
 */
export const Body = ({ children, className = "" }: BodyProps): ReactNode => {
  const classes = makeClasses("h-full", "w-full", "scrollbar-hide", "overflow-y-auto", className)

  return <div className={classes}>{children}</div>
}
