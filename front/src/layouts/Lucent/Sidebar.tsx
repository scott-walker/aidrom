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
  const sidebarHeaderClasses = cn(styles.layoutSidebarHeader)
  const sidebarBodyClasses = cn(styles.layoutSidebarBody)
  const sidebarSectionClasses = cn(styles.layoutSidebarSection)
  const sidebarFooterClasses = cn(styles.layoutSidebarFooter)

  return (
    <SidebarComponent className={sidebarClasses} {...props}>
      <SidebarHeader className={sidebarHeaderClasses}>
        <Brand size="md" compact={collapsed} inverted={collapsed} />
      </SidebarHeader>

      <SidebarBody className={sidebarBodyClasses}>
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
        <Separator />
        <SidebarSection className={sidebarSectionClasses}>
          <Menu items={items.filter((item, index) => item && index)} compact={collapsed} />
        </SidebarSection>
      </SidebarBody>

      <SidebarFooter className={sidebarFooterClasses}>
        <p>AI</p>
      </SidebarFooter>
    </SidebarComponent>
  )
}
