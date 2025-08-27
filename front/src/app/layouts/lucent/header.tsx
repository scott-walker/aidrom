import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { SidebarTrigger } from "@shared/ui/SidebarTrigger"
import { ThemeTrigger } from "@shared/ui/ThemeTrigger"
import { InfobarTrigger } from "@shared/ui/InfobarTrigger"
import { FooterTrigger } from "@shared/ui/FooterTrigger"

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
      <SidebarTrigger />
      <h1>HEADER: {title}</h1>
      {header}
      <div className="ml-auto flex items-center gap-4">
        <InfobarTrigger />
        <FooterTrigger />
        <ThemeTrigger />
      </div>
    </>
  )
}
