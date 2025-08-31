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
import { createLayout, usePage, type PageLayoutConfig, type PageLayoutProps } from "@lib/page-api"
import { cn } from "@utils/jsxtools"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Body } from "./body"
import { Infobar } from "./infobar"
import { Footer } from "./footer"

/**
 * Конфигурация макета панели управления
 */
const config: PageLayoutConfig = {
  meta: {
    title: "AIDrom",
    subtitle: "AIDrom Subtitle"
  }
}

/**
 * Основной макет панели управления
 */
export const LucentLayout = createLayout(config, ({ children }: PageLayoutProps): ReactNode => {
  const infobar = usePage().getSlot("infobar")
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

      <LucentBody>
        <Body>{children}</Body>
      </LucentBody>

      {infobar && (
        <LucentInfobar>
          <Infobar>{infobar}</Infobar>
        </LucentInfobar>
      )}

      <LucentFooter>
        <Footer />
      </LucentFooter>
    </Lucent>
  )
})
