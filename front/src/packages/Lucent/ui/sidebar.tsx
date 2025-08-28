import type { FC, ReactNode } from "react"
import type { SidebarSlots, SidebarSlotProps } from "../lib/types"
import { cn } from "../lib/utils"
import { useLayout } from "../lib/context"
import { Scrollbar } from "./scrollbar"
import styles from "../style/lucent.module.css"

/**
 * Шапка боковой панели макета
 * @namespace Lucent.UI.Sidebar.Header
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
 * @namespace Lucent.UI.Sidebar.Body
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
 * @namespace Lucent.UI.Sidebar.Footer
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
 * @namespace Lucent.UI.Sidebar
 */
export const Sidebar: FC<SidebarSlots> = ({ header, body, footer }): ReactNode => {
  const { isSidebarCollapsed, isSidebarHidden } = useLayout()
  const collapsed = isSidebarCollapsed()
  const hidden = isSidebarHidden()

  const classes = cn({
    [styles.layoutSidebar]: true,
    [styles.collapsed]: collapsed,
    [styles.hidden]: hidden
  })

  return (
    <aside className={classes}>
      {header && <SidebarHeader collapsed={collapsed}>{header}</SidebarHeader>}
      {body && <SidebarBody collapsed={collapsed}>{body}</SidebarBody>}
      {footer && <SidebarFooter collapsed={collapsed}>{footer}</SidebarFooter>}
    </aside>
  )
}
