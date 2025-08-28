import type { FC, ReactNode } from "react"
import type { PageFooterProps } from "../lib/types"
import { cn } from "../lib/utils"
import { useLayout } from "../lib/context"
import styles from "../style/lucent.module.css"

/**
 * Футер макета
 * @namespace Lucent.UI.Footer
 */
export const Footer: FC<PageFooterProps> = ({ children }): ReactNode => {
  const hidden = useLayout().isFooterHidden()
  const classes = cn(styles.layoutFooter, hidden && styles.hidden)
  const innerClasses = cn(styles.layoutFooterInner, hidden && styles.hidden)

  return (
    <footer className={classes}>
      <div className={innerClasses}>{children}</div>
    </footer>
  )
}
