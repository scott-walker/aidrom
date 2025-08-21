import type { FC, ReactNode } from "react"
import { Sidebar as SidebarComponent, SidebarHeader, SidebarBody } from "@components/Sidebar"
import { cn, cva } from "@utils/jsxtools"
import { Separator } from "@ui/Separator"
import { Brand } from "@components/Brand"
import { Menu, type MenuItems } from "@components/Menu"
import { SidebarSection } from "@components/Sidebar"

/**
 * Пропсы сайдбара макета
 * @namespace Layouts.Lucent.Sidebar.Props
 */
type Props = {
  collapsed: boolean
}

/**
 * Сайдбар макета
 * @namespace Layouts.Lucent.Sidebar
 * @returns {ReactNode}
 */
export const Sidebar: FC<Props> = ({ collapsed = false }: Props): ReactNode => {
  const headerVariants = cva("h-20", {
    variants: {
      collapsed: {
        true: "bg-brand-accent"
      }
    }
  })
  const sectionClasses = cn("py-3", "px-4")
  const items: MenuItems = [
    {
      label: "Панель",
      href: "#",
      icon: "gauge",
      active: true
    },
    {
      label: "Чаты",
      href: "#chats",
      icon: "message-circle"
    },
    {
      label: "Настройки",
      href: "#settings",
      icon: "bolt"
    }
  ]

  return (
    <SidebarComponent collapsed={collapsed}>
      <SidebarHeader className={headerVariants({ collapsed })}>
        <Brand size="md" compact={collapsed} inverted={collapsed} />
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection className={sectionClasses}>
          <Menu items={items} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
      </SidebarBody>

      {/* <SidebarFooter>
        <p>Не все права защищены</p>
      </SidebarFooter> */}
    </SidebarComponent>
  )
}
