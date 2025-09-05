import type { ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { cn } from "@utils/jsxtools"
import { Menu, type MenuItems } from "@ui/menu"
import { Brand } from "@ui/brand"
import { Separator } from "@ui/separator"
import { Icon } from "@ui/icon"
import { Scrollbar } from "@ui/scrollbar"

// Основное меню
const menuItems: MenuItems = [
  {
    label: "Панель",
    icon: "gauge",
    path: "/"
  },
  {
    label: "Сервис",
    icon: "wrench",
    path: "/service"
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
  const collapsed = useLayout().isSidebarCollapsed
  const classes = cn(
    "flex",
    "items-center",
    "justify-center",
    "h-[var(--layout-header-height)]",
    "border-b",
    "border-border"
  )

  return (
    <div className={classes}>
      <Brand size="md" compact={collapsed} />
    </div>
  )
}

/**
 * Основной контент сайдбара
 * @namespace Widgets.Layouts.UI.SidebarBody
 * @returns {ReactNode}
 */
export const SidebarBody = (): ReactNode => {
  // const sidebar = usePage().getSlot("sidebar")
  const collapsed = useLayout().isSidebarCollapsed
  const classes = cn(
    "flex-1",
    "h-[calc(100vh-var(--layout-header-height)-var(--layout-footer-height))]",
    "w-full",
    "overflow-x-hidden",
    "overflow-y-auto"
  )

  return (
    <div className={classes}>
      <Scrollbar xAxis={false}>
        <section className="p-4">
          <Menu items={menuItems} compact={collapsed} />
        </section>
        <Separator />
        <section className="p-4">
          <Menu items={developmentMenuItems} compact={collapsed} />
        </section>
        {/* {sidebar} */}
      </Scrollbar>
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
  const classes = cn(
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
  const classes = cn("h-full", "w-full", "shadow-2xl", "overflow-hidden")

  return (
    <div className={classes}>
      <SidebarHeader />
      <SidebarBody />
      <SidebarFooter />
    </div>
  )
}
