import type { FC, ReactNode } from "react"
import type { SidebarSlots, SidebarSlotProps } from "./types"
import { cn } from "./utils"
import { useLayout } from "./context"
import { Scrollbar } from "./Scrollbar"
import styles from "./Lucent.module.css"

/**
 * Шапка боковой панели макета
 * @namespace Lucent.SidebarHeader
 * @returns {ReactNode}
 */
const SidebarHeader: FC<SidebarSlotProps> = ({ children, collapsed }): ReactNode => {
  const classes = cn(styles.layoutSidebarHeader, collapsed && styles.collapsed)
  const innerClasses = cn(styles.layoutSidebarHeaderInner, collapsed && styles.collapsed)

  return (
    <header className={classes}>
      <div className={innerClasses}>{children}</div>
    </header>
  )
}

/**
 * Тело боковой панели макета
 * @namespace Lucent.SidebarBody
 * @returns {ReactNode}
 */
const SidebarBody: FC<SidebarSlotProps> = ({ children, collapsed }): ReactNode => {
  const classes = cn(styles.layoutSidebarBody, collapsed && styles.collapsed)
  const innerClasses = cn(styles.layoutSidebarBodyInner, collapsed && styles.collapsed)

  return (
    <div className={classes}>
      <Scrollbar>
        <div className={innerClasses}>{children}</div>
      </Scrollbar>
    </div>
  )
}

/**
 * Футер боковой панели макета
 * @namespace Lucent.SidebarFooter
 * @returns {ReactNode}
 */
const SidebarFooter: FC<SidebarSlotProps> = ({ children, collapsed }): ReactNode => {
  const classes = cn(styles.layoutSidebarFooter, collapsed && styles.collapsed)
  const innerClasses = cn(styles.layoutSidebarFooterInner, collapsed && styles.collapsed)

  return (
    <footer className={classes}>
      <div className={innerClasses}>{children}</div>
    </footer>
  )
}

/**
 * Сайдбар макета
 * @namespace Lucent.Sidebar
 * @returns {ReactNode}
 */
export const Sidebar: FC<SidebarSlots> = ({ header, body, footer }: SidebarSlots): ReactNode => {
  const collapsed = useLayout().isSidebarCollapsed()
  const classes = cn(styles.layoutSidebar, collapsed && styles.collapsed)

  return (
    <aside className={classes}>
      {header && <SidebarHeader collapsed={collapsed}>{header}</SidebarHeader>}
      {body && <SidebarBody collapsed={collapsed}>{body}</SidebarBody>}
      {footer && <SidebarFooter collapsed={collapsed}>{footer}</SidebarFooter>}
    </aside>
  )
}
