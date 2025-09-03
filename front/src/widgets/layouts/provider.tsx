import type { ReactNode } from "react"
import { Lucent, type LayoutConfig, type LayoutSidebarMode, type LayoutThemeMode } from "@scottwalker/lucent"
import { getLayoutTheme, getLayoutSidebar, LayoutProvider as LayoutAdapterProvider } from "@lib/layout-api"
import { PageProvider, type PageConfig } from "@lib/page-api"

/**
 * Провайдер макета
 * @namespace Widgets.Layouts.Provider
 */
export const LayoutProvider = ({ children }: { children: ReactNode }): ReactNode => {
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
      infobarWidth: "var(--layout-infobar-width)",
      infobarCollapsedWidth: "var(--layout-infobar-collapsed-width)",
      transitionDuration: "var(--layout-transition-duration)"
    }
  }

  // Конфигурация по умолчанию для страниц
  const pageConfig: PageConfig = {
    meta: {
      title: "AIDrom"
    }
  }

  return (
    <Lucent config={layoutConfig}>
      <LayoutAdapterProvider>
        <PageProvider config={pageConfig}>{children}</PageProvider>
      </LayoutAdapterProvider>
    </Lucent>
  )
}
