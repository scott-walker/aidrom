import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { HeaderVisibleTrigger } from "@shared/ui/triggers"
import { cn } from "@shared/utils/jsxtools"

/**
 * Футер макета
 * @namespace App.Layouts.Lucent.Footer
 * @returns {ReactNode}
 */
export const Footer = (): ReactNode => {
  const { getSlot } = usePage()
  const footer = getSlot("footer")

  return (
    <div className={cn("flex", "items-center", "h-full", "px-6", "border-t", "border-border")}>
      <h1>FOOTER</h1>
      <HeaderVisibleTrigger />
      {footer}
    </div>
  )
}
