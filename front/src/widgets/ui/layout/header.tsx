import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { cn } from "@utils/jsxtools"
import { ThemeTrigger } from "@ui/triggers"
import { FooterVisibleTrigger } from "@ui/triggers"
import { SidebarCollapseTrigger } from "@ui/triggers"
import { Heading } from "@ui/heading"

/**
 * Заголовок макета
 * @namespace App.Layouts.Lucent.Header
 */
export const Header = (): ReactNode => {
  const { getTitle, getSubtitle, getSlot } = usePage()
  const title = getTitle()
  const subtitle = getSubtitle()
  const header = getSlot("header")
  const classes = cn(
    "flex",
    "items-center",
    "justify-between",
    "gap-8",
    "px-[var(--layout-inner-offset-x)]",
    "h-full",
    "border-b",
    "border-border"
  )

  return (
    <div className={classes}>
      <div className="flex items-center gap-4">
        <SidebarCollapseTrigger />
        <Heading level={4}>
          {title}
          {subtitle && <span className="ml-4">{subtitle}</span>}
        </Heading>
      </div>
      <div className="flex-1">{header}</div>
      <div className="flex items-center gap-4">
        <FooterVisibleTrigger />
        <ThemeTrigger />
      </div>
    </div>
  )
}
