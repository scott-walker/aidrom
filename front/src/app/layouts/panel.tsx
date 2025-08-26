import type { ReactNode } from "react"
import { NavLink } from "react-router"
import { createLayout, type PageLayoutConfig, type PageLayoutProps, usePage } from "@lib/page-api"

const config: PageLayoutConfig = {
  meta: {
    title: "Panel Layout"
  },
  slots: {
    header: <h1>OOOOOOH</h1>
  }
}

/**
 * Основной макет панели управления
 * @namespace App.Layouts.Panel
 */
export const PanelLayout = createLayout(config, ({ children }: PageLayoutProps): ReactNode => {
  const { getTitle, getSlot } = usePage()

  const header = getSlot("header")
  const sidebar = getSlot("sidebar")
  const infobar = getSlot("infobar")
  const footer = getSlot("footer")

  const title = getTitle()
  const linkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? "text-primary" : "hover:text-primary")

  // const { slots, appendToHeader } = useLayout()
  // const meta = useMeta()
  // const title = meta.title ?? "Default"

  return (
    <div className="flex flex-col h-screen">
      <header className="p-10 text-2xl bg-gradient-brand text-background">
        <h1>HEADER: {title}</h1>
        {header}
      </header>
      <div className="flex-1 flex justify-between bg-background">
        <aside className="p-10 bg-background-hard text-foreground">
          <h1>SIDEBAR</h1>
          <nav className="mt-6">
            <ul>
              <li>
                <NavLink className={linkClassName} to="/" end>
                  Dashboard index
                </NavLink>
              </li>
              <li>
                <NavLink className={linkClassName} to="/settings">
                  Dashboard settings
                </NavLink>
              </li>
            </ul>
          </nav>
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
