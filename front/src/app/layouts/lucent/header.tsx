import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { ThemeTrigger } from "@shared/ui/ThemeTrigger"
import { FooterVisibleTrigger } from "@shared/ui/FooterVisibleTrigger"
import { SidebarVisibleTrigger } from "@shared/ui/SidebarVisibleTrigger"
import { SidebarCollapseTrigger } from "@shared/ui/SidebarCollapseTrigger"
import { InfobarVisibleTrigger } from "@shared/ui/InfobarVisibleTrigger"
import { InfobarCollapseTrigger } from "@shared/ui/InfobarCollapseTrigger"

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

  return (
    <>
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
    </>
  )
}
