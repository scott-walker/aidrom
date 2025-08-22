import type { FC, ReactNode } from "react"
import { Sidebar as SidebarComponent, SidebarSection, SidebarBody, SidebarHeader } from "@components/Sidebar"
import { cn } from "@utils/jsxtools"
import { Separator } from "@ui/Separator"
import { Brand } from "@components/Brand"
import { Menu, type MenuItems } from "@components/Menu"
import styles from "./Lucent.module.css"

/**
 * Пропсы сайдбара макета
 * @namespace Layouts.Lucent.Sidebar.Props
 */
type Props = {
  collapsed: boolean
}

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

/**
 * Сайдбар макета
 * @namespace Layouts.Lucent.Sidebar
 * @returns {ReactNode}
 */
export const Sidebar: FC<Props> = ({ collapsed = false }: Props): ReactNode => {
  return (
    <SidebarComponent className={cn(styles.sidebar, collapsed && styles.collapsed)}>
      <SidebarHeader className={styles.header}>
        <Brand size="md" compact={collapsed} inverted={collapsed} />
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection className={styles.section}>
          <Menu items={items} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={styles.section}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={styles.section}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
      </SidebarBody>

      {/* <SidebarFooter>
        <p>Не все права защищены</p>
      </SidebarFooter> */}
    </SidebarComponent>
  )
}
