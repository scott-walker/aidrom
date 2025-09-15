import type { ReactNode } from "react"
import { useLayout } from "@lib/layout-api"
import { cn } from "@utils/jsxtools"
import { ThemeTrigger } from "@ui/triggers"
// import { SidebarCollapseTrigger } from "@ui/triggers"
import { Heading } from "@ui/heading"
import { Icon } from "@ui/icon"
// import { FooterVisibleTrigger } from "@ui/triggers"
import { Brand } from "@ui/brand"

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
    // "shadow-md/10"
    "border-b",
    "border-border"
    // "bg-background-soft"
  )

  return (
    <div className={classes}>
      <div className="flex-1 flex items-center gap-8">
        {/* <SidebarCollapseTrigger /> */}
        <Brand withIcon={false} />
        <Heading level={7} className="flex-1 flex items-center justify-center gap-6">
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
