import type { FC, ReactNode } from "react"
import type { LayoutApi } from "../lib/types"
import { Sidebar } from "./sidebar"
import { Page } from "./page"
import { Header } from "./header"
import { Body } from "./body"
import { Content } from "./content"
import { Infobar } from "./infobar"
import { Footer } from "./footer"
import { useLayout } from "../lib/context"
import styles from "../style/lucent.module.css"

/**
 * Каркас макета
 * @namespace Lucent.UI.Layout
 */
export const Layout: FC = (): ReactNode => {
  const { modes, slots, hasSidebar, hasHeader, hasInfobar, hasFooter, hasContent }: LayoutApi = useLayout()

  if (!hasContent()) {
    throw new Error("Ну контент же, все-таки, нужно передать 🙄")
  }

  const header = hasHeader() ? <Header>{slots.header}</Header> : null
  const sidebar = hasSidebar() ? <Sidebar {...slots.sidebar} /> : null
  const infobar = hasInfobar() ? <Infobar>{slots.infobar}</Infobar> : null
  const footer = hasFooter() ? <Footer>{slots.footer}</Footer> : null
  const content = <Content>{slots.content}</Content>

  // Аттрибуты для опредления глобальных стилей
  const modeAttributes = {
    "data-theme-mode": modes.theme,
    "data-header-visible-mode": modes.headerVisible,
    "data-footer-visible-mode": modes.footerVisible,
    "data-sidebar-visible-mode": modes.sidebarVisible,
    "data-sidebar-collapsed-mode": modes.sidebarCollapsed,
    "data-infobar-visible-mode": modes.infobarVisible,
    "data-infobar-collapsed-mode": modes.infobarCollapsed
  }

  return (
    <div className={styles.layout} {...modeAttributes}>
      {sidebar}
      <Page>
        {header}
        <Body>
          {content}
          {infobar}
        </Body>
        {footer}
      </Page>
    </div>
  )
}
