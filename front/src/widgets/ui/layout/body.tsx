import type { ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Scrollbar } from "@ui/scrollbar"

/**
 * Тело для макета
 * @namespace Widgets.UI.LayoutBody
 */
export const Body = ({ children }: { children: ReactNode }): ReactNode => {
  const classes = cn("h-full", "w-full", "p-[var(--layout-inner-offset)]")

  return (
    <Scrollbar xAxis={false}>
      <div className={classes}>{children}</div>
    </Scrollbar>
  )
}
