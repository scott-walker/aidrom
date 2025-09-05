import type { ReactNode } from "react"
import { useLayout } from "@lib/layout-api"
import { cn } from "@utils/jsxtools"
import { ThemeTrigger } from "@ui/triggers"
import { SidebarCollapseTrigger } from "@ui/triggers"
import { Heading } from "@ui/heading"
import { Icon } from "@ui/icon"
// import { FooterVisibleTrigger } from "@ui/triggers"

/**
 * Заголовок макета
 * @namespace Widgets.Layouts.UI.Header
 */
export const Header = (): ReactNode => {
  const { title, subtitle } = useLayout()
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
      <div className="flex items-center gap-8">
        <SidebarCollapseTrigger />
        <Heading level={4} className="flex items-center gap-6">
          {title}
          {subtitle && <Icon name="chevron-right" size={20} strokeWidth={3} />}
          {subtitle}
        </Heading>
      </div>
      <div className="flex items-center gap-4">
        {/* <FooterVisibleTrigger /> */}
        <ThemeTrigger />
      </div>
    </div>
  )
}
