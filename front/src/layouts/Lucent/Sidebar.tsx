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
import { Icon } from "@ui/Icon"

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
  const { isSidebarCollapsed } = useContext(LayoutContext) as ILayoutContext
  const collapsed = isSidebarCollapsed()

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
        <div className="flex items-center justify-center gap-3.5">
          {/* <span className="text-3xl">🐣</span>
          {collapsed || (
            <>
              <span className="flex items-center text-primary-foreground">
                Я_РОДИЛСЯ <Icon name="copyright" size={25} strokeWidth={3} /> 2025
              </span>
            </>
          )} */}
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
      </SidebarFooter>
    </SidebarComponent>
  )
}
