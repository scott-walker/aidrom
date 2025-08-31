import type { ReactNode } from "react"
import { type LayoutConfig, Lucent, THEME_MODE_LIGHT, SIDEBAR_MODE_COLLAPSED } from "@scottwalker/lucent"
import { LayoutProvider as LayoutAdapterProvider } from "@lib/layout-api"
import { PageProvider, type PageConfig } from "@lib/page-api"

/**
 * Провайдер макета
 * @namespace Widgets.Layouts.Provider
 * @param {ReactNode} children дочерние элементы
 */
export const LayoutProvider = ({ children }: { children: ReactNode }): ReactNode => {
  // Конфигурация Lucent макета
  const layoutConfig: LayoutConfig = {
    modes: {
      theme: THEME_MODE_LIGHT,
      sidebar: SIDEBAR_MODE_COLLAPSED
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
      title: "AIDrom",
      subtitle: "AIDrom Subtitle"
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
