import type { ReactNode } from "react"
import type { PageFooterProps } from "./types"
import { cn } from "./utils"
import { useLayout } from "./context"
import { FOOTER_MODE_HIDDEN } from "./constants"
import styles from "./Lucent.module.css"

/**
 * Футер макета
 * @namespace Lucent.Footer
 * @param {PageFooterProps} props.children - контент
 * @returns {ReactNode}
 */
export const Footer = ({ children }: PageFooterProps): ReactNode => {
  const { modes } = useLayout()
  const hidden = modes.footer === FOOTER_MODE_HIDDEN
  const classes = cn(styles.layoutFooter, hidden && styles.footerHidden)
  const innerClasses = cn(styles.layoutFooterInner, hidden && styles.footerHidden)

  return (
    <footer className={classes}>
      <div className={innerClasses}>{children}</div>
    </footer>
  )
}
