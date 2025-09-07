import type { ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Тело для макета
 * @namespace Widgets.Layouts.UI.LayoutBody
 */
export const Body = ({ children }: { children: ReactNode }): ReactNode => {
  const classes = cn("h-full", "w-full", "scrollbar-hide")

  return <div className={classes}>{children}</div>
}
