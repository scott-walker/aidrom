import type { ReactNode } from "react"
import { useMenuItems } from "@lib/layout-api"
import { makeClasses } from "@lib/style-api"
import { Menu } from "@ui/menu"
import { Separator } from "@ui/separator"
import { Icon } from "@ui/icon"

/**
 * Пропсы сайдбара
 * @namespace Widgets.Layouts.UI.SidebarProps
 */
interface SidebarProps {
  className?: string
}

/**
 * Сайдбар
 * @namespace Widgets.Layouts.UI.Sidebar
 * @returns {ReactNode}
 */
export const Sidebar = ({ className = "" }: SidebarProps): ReactNode => {
  const { menuItems, chatMenuItems, developmentMenuItems } = useMenuItems()

  const sidebarClasses = makeClasses(
    "h-full",
    "w-full",
    "bg-background-soft",
    "shadow-2xl/5",
    "overflow-hidden",
    className
  )
  const bodyClasses = makeClasses("h-full", "w-full", "overflow-x-hidden", "overflow-y-auto")
  const sectionClasses = makeClasses("p-4")
  const headerClasses = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "h-[var(--layout-header-height)]",
    "border-b",
    "border-border"
  )

  return (
    <div className={sidebarClasses}>
      <div className={headerClasses}>
        <Icon name="bot-message-square" size={42} strokeWidth={2} />
      </div>

      <div className={bodyClasses}>
        <section className={sectionClasses}>
          <Menu items={menuItems} />
        </section>
        <Separator />
        <section className={sectionClasses}>
          <Menu items={chatMenuItems} />
        </section>
        <Separator />
        <section className={sectionClasses}>
          <Menu items={developmentMenuItems} />
        </section>
      </div>
    </div>
  )
}
