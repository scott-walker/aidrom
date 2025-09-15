import type { ReactNode } from "react"
import {
  Lucent,
  SIDEBAR_MODE_COLLAPSED,
  type LayoutConfig,
  // type LayoutSidebarMode,
  type LayoutThemeMode
} from "@scottwalker/lucent"
import { getLayoutTheme, LayoutProvider as LayoutAdapterProvider } from "@lib/layout-api"

/**
 * Провайдер макета
 * @namespace App.Provider
 */
export const LayoutProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const theme = getLayoutTheme() as LayoutThemeMode
  // const sidebar = getLayoutSidebar() as LayoutSidebarMode
  const sidebar = SIDEBAR_MODE_COLLAPSED

  // Конфигурация Lucent макета
  const layoutConfig: LayoutConfig = {
    modes: {
      theme,
      sidebar
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

  return (
    <Lucent config={layoutConfig}>
      <LayoutAdapterProvider>{children}</LayoutAdapterProvider>
    </Lucent>
  )
}
