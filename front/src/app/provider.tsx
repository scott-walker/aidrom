import type { ReactNode } from "react"
import { Lucent, type LayoutConfig, type LayoutSidebarMode, type LayoutThemeMode } from "@scottwalker/lucent"
import { getLayoutTheme, getLayoutSidebar, LayoutProvider as LayoutAdapterProvider } from "@lib/layout-api"

/**
 * Провайдер приложения
 * @namespace App.Provider
 */
export const AppProvider = ({ children }: { children: ReactNode }): ReactNode => {
  // console.log("AppProvider")

  const theme = getLayoutTheme() as LayoutThemeMode
  const sidebar = getLayoutSidebar() as LayoutSidebarMode

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
      infobarWidth: "0rem",
      infobarCollapsedWidth: "0rem",
      // infobarWidth: "var(--layout-infobar-width)",
      // infobarCollapsedWidth: "var(--layout-infobar-collapsed-width)",
      transitionDuration: "var(--layout-transition-duration)"
    }
  }

  return (
    <Lucent config={layoutConfig}>
      <LayoutAdapterProvider>{children}</LayoutAdapterProvider>
    </Lucent>
  )
}
