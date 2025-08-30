import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { ThemeTrigger } from "@shared/ui/triggers"
import { FooterVisibleTrigger } from "@shared/ui/triggers"
import { SidebarVisibleTrigger } from "@shared/ui/triggers"
import { SidebarCollapseTrigger } from "@shared/ui/triggers"
import { InfobarVisibleTrigger } from "@shared/ui/triggers"
import { InfobarCollapseTrigger } from "@shared/ui/triggers"
import { cn } from "@utils/jsxtools"

/**
 * Заголовок макета
 * @namespace App.Layouts.Lucent.Header
 * @param {ReactNode} children - контент заголовка
 * @returns {ReactNode}
 */
export const Header = (): ReactNode => {
  const { getTitle, getSlot } = usePage()
  const title = getTitle()
  const header = getSlot("header")
  const classes = cn("flex", "items-center", "justify-between", "h-full", "border-b", "border-border")

  return (
    <div className={classes}>
      <SidebarVisibleTrigger />
      <SidebarCollapseTrigger />
      <h1>HEADER: {title}</h1>
      {header}
      <div className="ml-auto flex items-center gap-4">
        <InfobarVisibleTrigger />
        <InfobarCollapseTrigger />
        <FooterVisibleTrigger />
        <ThemeTrigger />
      </div>
    </div>
  )
}
