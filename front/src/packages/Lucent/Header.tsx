import type { ReactNode } from "react"
import type { PageHeaderProps } from "./types"
import styles from "./Lucent.module.css"

/**
 * Шапка макета
 * @namespace Lucent.Header
 * @param {PageHeaderProps} props.children - контент
 * @returns {ReactNode}
 */
export const Header = ({ children }: PageHeaderProps): ReactNode => {
  return (
    <header className={styles.layoutHeader}>
      <div className={styles.layoutHeaderInner}>{children}</div>
    </header>
  )
}
