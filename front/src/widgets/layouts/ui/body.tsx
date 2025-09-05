import type { ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Scrollbar } from "@ui/scrollbar"

/**
 * Тело для макета
 * @namespace Widgets.Layouts.UI.LayoutBody
 */
export const Body = ({ children }: { children: ReactNode }): ReactNode => {
  const classes = cn("h-full", "w-full", "px-[var(--layout-inner-offset-x)]", "py-[var(--layout-inner-offset-y)]")

  return (
    <Scrollbar xAxis={false}>
      <div className={classes}>{children}</div>
    </Scrollbar>
  )
}
