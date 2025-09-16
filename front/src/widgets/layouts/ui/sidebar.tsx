import type { ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { makeClasses } from "@lib/style-api"
import { Menu, type MenuItems } from "@ui/menu"
import { Separator } from "@ui/separator"
import { Icon } from "@ui/icon"

// Основное меню
const menuItems: MenuItems = [
  {
    label: "Панель",
    icon: "gauge",
    path: "/"
  },
  {
    label: "Сервис",
    icon: "settings",
    path: "/service"
  }
]

// Меню для разработки
const chatMenuItems: MenuItems = [
  {
    label: "Чат",
    icon: "messages-square",
    path: "/chat"
  },
  {
    label: "Агенты",
    icon: "bot",
    path: "/agents"
  }
]

// Меню для разработки
const developmentMenuItems: MenuItems = [
  {
    label: "Разработка",
    icon: "code",
    path: "/test"
  }
]

/**
 * Шапка сайдбара
 * @namespace Widgets.Layouts.UI.SidebarHeader
 * @returns {ReactNode}
 */
export const SidebarHeader = (): ReactNode => {
  const classes = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "h-[var(--layout-sidebar-header-height)]",
    "border-b",
    "border-border"
    // "bg-brand-gradient",
    // "text-primary-foreground"
    // "text-primary"
  )

  return (
    <div className={classes}>
      <Icon name="bot-message-square" size={42} strokeWidth={2} />
    </div>
  )
}

/**
 * Основной контент сайдбара
 * @namespace Widgets.Layouts.UI.SidebarBody
 * @returns {ReactNode}
 */
export const SidebarBody = (): ReactNode => {
  const collapsed = useLayout().isSidebarCollapsed
  const classes = makeClasses(
    "flex-1",
    "h-[calc(100vh-var(--layout-header-height)-var(--layout-footer-height))]",
    "w-full",
    "overflow-x-hidden",
    "overflow-y-auto"
  )

  return (
    <div className={classes}>
      <section className="p-4">
        <Menu items={menuItems} compact={collapsed} />
      </section>
      <Separator />
      <section className="p-4">
        <Menu items={chatMenuItems} compact={collapsed} />
      </section>
      <Separator />
      <section className="p-4">
        <Menu items={developmentMenuItems} compact={collapsed} />
      </section>
    </div>
  )
}

/**
 * Футер сайдбара
 * @namespace Widgets.Layouts.UI.SidebarFooter
 * @returns {ReactNode}
 */
export const SidebarFooter = (): ReactNode => {
  const collapsed = useLayout().isSidebarCollapsed
  const classes = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "h-[var(--layout-footer-height)]",
    "gap-4",
    "bg-brand-gradient",
    "text-primary-foreground"
  )

  return (
    <div className={classes}>
      <Icon name="audio-lines" size={35} strokeWidth={3} />
      {collapsed || (
        <>
          <span className="flex items-cente">
            PROTO
            <Icon name="copyright" size={25} strokeWidth={3} /> AI
          </span>
        </>
      )}
    </div>
  )
}

/**
 * Сайдбар
 * @namespace Widgets.Layouts.UI.Sidebar
 * @returns {ReactNode}
 */
export const Sidebar = (): ReactNode => {
  const classes = makeClasses(
    "h-full",
    "w-full",
    "bg-background-soft",
    "shadow-2xl/5",
    // "border-r-1",
    // "border-border",
    "overflow-hidden"
  )

  return (
    <div className={classes}>
      <SidebarHeader />
      <SidebarBody />
      <SidebarFooter />
    </div>
  )
}
