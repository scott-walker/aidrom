import type { ReactNode } from "react"
import { createLayout, type PageLayoutConfig, type PageLayoutProps, usePage } from "@lib/page-api"
import { Lucent, type LayoutConfig, normalizeConfig } from "@packages/Lucent"
import { Header } from "./header"
import { Footer } from "./footer"
import { SidebarBody, SidebarFooter, SidebarHeader } from "./sidebar"

/**
 * Конфигурация макета панели управления
 */
const config: PageLayoutConfig = {
  meta: {
    title: "Default Page Title"
  },
  slots: {
    header: "Default Page Header",
    sidebar: "Default Page Sidebar",
    infobar: "Default Page Infobar",
    footer: "Default Page Footer"
  }
}

/**
 * Основной макет панели управления
 */
export const LucentLayout = createLayout(config, ({ children }: PageLayoutProps): ReactNode => {
  const { getSlot } = usePage()

  const infobar = getSlot("infobar")
  const config: LayoutConfig = normalizeConfig({
    modes: {
      theme: "light",
      page: "default",
      sidebar: "expanded",
      footer: "visible",
      infobar: "visible"
    },
    slots: {
      header: <Header />,
      sidebar: {
        header: <SidebarHeader />,
        body: <SidebarBody />,
        footer: <SidebarFooter />
      },
      content: children,
      infobar: infobar ?? null,
      footer: <Footer />
    }
  })

  return <Lucent config={config} />
})
