import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { HeaderVisibleTrigger } from "@features/triggers"
import { cn } from "@utils/jsxtools"

/**
 * Футер макета
 * @namespace Widgets.Layouts.UI.Footer
 * @returns {ReactNode}
 */
export const Footer = (): ReactNode => {
  const { getSlot } = usePage()
  const footer = getSlot("footer")
  const classes = cn(
    "flex",
    "items-center",
    "h-full",
    "px-[var(--layout-inner-offset-x)]",
    "border-t",
    "border-border",
    "bg-background-hard"
  )

  return (
    <div className={classes}>
      <h1>FOOTER</h1>
      {footer}
      <div className="ml-auto">
        <HeaderVisibleTrigger />
      </div>
    </div>
  )
}
