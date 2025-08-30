import type { ReactNode } from "react"
import {
  type LayoutConfig,
  Lucent,
  LucentHeader,
  LucentBody,
  LucentFooter,
  LucentInfobar,
  LucentSidebar
} from "@scottwalker/lucent"
import { createLayout, type PageLayoutConfig, type PageLayoutProps, usePage } from "@lib/page-api"
import { cn } from "@utils/jsxtools"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"

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
  const config: LayoutConfig = {
    modes: {
      theme: "light",
      sidebar: "collapsed"
    },
    params: {
      headerHeight: "var(--layout-header-height)",
      footerHeight: "var(--layout-footer-height)",
      sidebarWidth: "var(--layout-sidebar-width)",
      sidebarCollapsedWidth: "var(--layout-sidebar-collapsed-width)",
      infobarWidth: "var(--layout-infobar-width)",
      infobarCollapsedWidth: "var(--layout-infobar-collapsed-width)",
      transitionDuration: "var(--layout-transition-duration)"
    }
  }
  const classes = cn("h-screen", "w-screen", "bg-background", "text-foreground")

  return (
    <Lucent config={config} className={classes}>
      <LucentHeader>
        <Header />
      </LucentHeader>

      <LucentSidebar>
        <Sidebar />
      </LucentSidebar>
      <LucentBody>{children}</LucentBody>
      <LucentInfobar>{infobar}</LucentInfobar>

      <LucentFooter>
        <Footer />
      </LucentFooter>
    </Lucent>
  )
})
