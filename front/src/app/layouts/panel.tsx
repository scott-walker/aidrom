import type { ReactNode } from "react"
import { createLayout, type PageLayoutConfig, type PageLayoutProps, usePage } from "@lib/page-api"
import { Menu, type MenuItems } from "@ui/Menu"

/**
 * Конфигурация макета панели управления
 */
const config: PageLayoutConfig = {
  meta: {
    title: "Panel Layout"
  },
  slots: {
    header: <h1>OOOOOOH</h1>
  }
}

/**
 * Элементы меню
 */
const menuItems: MenuItems = [
  {
    label: "Dashboard",
    icon: "home",
    path: "/"
  },
  {
    label: "Settings",
    icon: "settings",
    path: "/settings"
  },
  {
    label: "Test",
    icon: "activity",
    path: "/test"
  }
]

/**
 * Основной макет панели управления
 */
export const PanelLayout = createLayout(config, ({ children }: PageLayoutProps): ReactNode => {
  const { getTitle, getSlot } = usePage()

  const header = getSlot("header")
  const sidebar = getSlot("sidebar")
  const infobar = getSlot("infobar")
  const footer = getSlot("footer")
  const title = getTitle()

  return (
    <div className="flex flex-col h-screen">
      <header className="p-10 text-2xl bg-gradient-brand text-background">
        <h1>HEADER: {title}</h1>
        {header}
      </header>
      <div className="flex-1 flex justify-between bg-background">
        <aside className="p-10 bg-background-hard text-foreground">
          <h1>SIDEBAR</h1>
          <Menu items={menuItems} />

          {sidebar}
        </aside>

        <main className="flex-1 p-20">{children}</main>

        <aside className="p-10 bg-background-hard text-foreground">
          <h1>INFOBAR</h1>
          {infobar}
        </aside>
      </div>
      <footer className="p-10 text-2xl bg-foreground text-background">
        <h1>FOOTER</h1>
        {footer}
      </footer>
    </div>
  )
})
