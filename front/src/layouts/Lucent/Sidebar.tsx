import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import {
  Sidebar as SidebarComponent,
  SidebarSection,
  SidebarBody,
  SidebarHeader,
  SidebarFooter
} from "@components/Sidebar"
import { cn } from "@utils/jsxtools"
import { Separator } from "@ui/Separator"
import { Brand } from "@components/Brand"
import { Menu, type MenuItems } from "@components/Menu"
import { LayoutContext, type ILayoutContext } from "./context"
import styles from "./Lucent.module.css"

/**
 * Пропсы сайдбара макета
 * @namespace Layouts.Lucent.Sidebar.Props
 */
type Props = ComponentProps<typeof SidebarComponent>

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
export const Sidebar: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { sidebarCollapsed: collapsed } = useContext(LayoutContext) as ILayoutContext

  const sidebarClasses = cn(styles.layoutSidebar, collapsed && styles.collapsed)
  const sidebarHeaderClasses = cn(styles.layoutSidebarHeader, collapsed && styles.collapsed)
  const sidebarBodyClasses = cn(styles.layoutSidebarBody, collapsed && styles.collapsed)
  const sidebarSectionClasses = cn(styles.layoutSidebarSection, collapsed && styles.collapsed)
  const sidebarFooterClasses = cn(styles.layoutSidebarFooter, collapsed && styles.collapsed)

  const filteredItems = items.filter((item, index) => item && index)

  return (
    <SidebarComponent className={sidebarClasses} {...props}>
      <SidebarHeader className={sidebarHeaderClasses}>
        <Brand size="md" compact={collapsed} />
      </SidebarHeader>

      <SidebarBody className={sidebarBodyClasses}>
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={filteredItems} compact={collapsed} />
          <Menu items={filteredItems} compact={collapsed} />
          <Menu items={filteredItems} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={filteredItems} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={filteredItems} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={filteredItems} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={filteredItems} compact={collapsed} />
        </SidebarSection>
      </SidebarBody>

      <SidebarFooter className={sidebarFooterClasses}>
        <p>&copy; {collapsed || "Не всё так просто 2025"}</p>
      </SidebarFooter>
    </SidebarComponent>
  )
}
