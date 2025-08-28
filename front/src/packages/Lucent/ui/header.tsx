import type { FC, ReactNode } from "react"
import type { PageHeaderProps } from "../lib/types"
import { useLayout } from "../lib/context"
import { cn } from "../lib/utils"
import styles from "../style/lucent.module.css"

/**
 * Шапка макета
 * @namespace Lucent.UI.Header
 */
export const Header: FC<PageHeaderProps> = ({ children }): ReactNode => {
  const hidden = useLayout().isHeaderHidden()
  const classes = cn(styles.layoutHeader, hidden && styles.hidden)
  const innerClasses = cn(styles.layoutHeaderInner, hidden && styles.hidden)

  return (
    <header className={classes}>
      <div className={innerClasses}>{children}</div>
    </header>
  )
}
