import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Scrollbar } from "@ui/Scrollbar"
import { Separator } from "@ui/Separator"
import { Icon } from "@ui/Icon"
import { Brand } from "@components/Brand"
import { Menu, type MenuItems } from "@components/Menu"
import { LayoutContext, type ILayoutContext } from "./context"
import styles from "./Lucent.module.css"

/**
 * Пропсы сайдбара макета
 * @namespace Layouts.Lucent.Sidebar.Props
 */
type Props = ComponentProps<"aside">

const items: MenuItems = [
  {
    label: "Панель",
    href: "/",
    icon: "gauge"
  },
  {
    label: "Чаты",
    href: "/chats",
    icon: "message-circle"
  },
  {
    label: "Инструменты",
    href: "/tools",
    icon: "code"
  }
]

const debugItems: MenuItems = [
  {
    label: "Тест",
    href: "/test",
    icon: "amphora"
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
  const sidebarHeaderInnerClasses = cn(styles.layoutSidebarHeaderInner, collapsed && styles.collapsed)
  const sidebarBodyClasses = cn(styles.layoutSidebarBody, collapsed && styles.collapsed)
  const sidebarBodyInnerClasses = cn(styles.layoutSidebarBodyInner, collapsed && styles.collapsed)
  const sidebarSectionClasses = cn(styles.layoutSidebarSection, collapsed && styles.collapsed)
  const sidebarFooterClasses = cn(styles.layoutSidebarFooter, collapsed && styles.collapsed)
  const sidebarFooterInnerClasses = cn(styles.layoutSidebarFooterInner, collapsed && styles.collapsed)

  return (
    <aside className={sidebarClasses} {...props}>
      <header className={sidebarHeaderClasses}>
        <div className={sidebarHeaderInnerClasses}>
          <Brand size="md" compact={collapsed} />
        </div>
      </header>

      <div className={sidebarBodyClasses}>
        <Scrollbar className={sidebarBodyInnerClasses}>
          <section className={sidebarSectionClasses}>
            <Menu items={items} compact={collapsed} />
          </section>
          <Separator />
          <section className={sidebarSectionClasses}>
            <Menu items={debugItems} compact={collapsed} />
          </section>
          <Separator />
        </Scrollbar>
      </div>

      <footer className={sidebarFooterClasses}>
        <div className={sidebarFooterInnerClasses}>
          <div className="flex items-center justify-center gap-3.5 font-bold">
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
        </div>
      </footer>
    </aside>
  )
}
