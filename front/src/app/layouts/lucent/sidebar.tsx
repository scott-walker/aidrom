import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { Menu, type MenuItems } from "@ui/Menu"
import { Brand } from "@ui/Brand"
import { Separator } from "@ui/Separator"
import { Icon } from "@shared/ui/Icon"
import { useLayout } from "@packages/Lucent"

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
 * Шапка сайдбара
 * @namespace App.Layouts.Lucent.SidebarHeader
 * @returns {ReactNode}
 */
export const SidebarHeader = (): ReactNode => {
  const collapsed = useLayout().isSidebarCollapsed()

  return <Brand size="md" compact={collapsed} />
}

/**
 * Основной контент сайдбара
 * @namespace App.Layouts.Lucent.SidebarBody
 * @returns {ReactNode}
 */
export const SidebarBody = (): ReactNode => {
  const { getSlot } = usePage()
  const collapsed = useLayout().isSidebarCollapsed()
  const sidebar = getSlot("sidebar")

  return (
    <>
      <section className="p-4">
        <Menu items={menuItems} compact={collapsed} />
      </section>
      <Separator />
      {sidebar}
    </>
  )
}

/**
 * Футер сайдбара
 * @namespace App.Layouts.Lucent.SidebarFooter
 * @returns {ReactNode}
 */
export const SidebarFooter = (): ReactNode => {
  const collapsed = useLayout().isSidebarCollapsed()

  return (
    <div className="flex items-center justify-center gap-4">
      <Icon name="audio-lines" size={35} strokeWidth={3} />
      {collapsed || (
        <>
          <span className="flex items-center text-primary-foreground">
            PROTO
            <Icon name="copyright" size={25} strokeWidth={3} /> AI
          </span>
        </>
      )}
    </div>
  )
}
