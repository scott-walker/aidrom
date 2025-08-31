import type { ReactNode } from "react"
import { cn } from "@shared/utils/jsxtools"
import { Scrollbar } from "@shared/ui/scrollbar"

/**
 * Тело макета
 * @namespace App.Layouts.Lucent.Body
 */
export const Body = ({ children }: { children: ReactNode }): ReactNode => {
  const classes = cn("h-full", "w-full", "p-[var(--layout-inner-offset)]")

  return (
    <Scrollbar xAxis={false}>
      <div className={classes}>{children}</div>
    </Scrollbar>
  )
}
