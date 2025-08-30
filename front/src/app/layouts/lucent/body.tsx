import type { ReactNode } from "react"
import { cn } from "@shared/utils/jsxtools"
import { Scrollbar } from "@shared/ui/scrollbar"

/**
 * Тело макета
 * @namespace App.Layouts.Lucent.Body
 */
export const Body = ({ children }: { children: ReactNode }): ReactNode => {
  const classes = cn("h-full", "w-full")

  return (
    <div className={classes}>
      <Scrollbar xAxis={false}>{children}</Scrollbar>
    </div>
  )
}
