import type { FC, ReactNode } from "react"
import type { PageBodyProps } from "../lib/types"
import styles from "../style/lucent.module.css"

/**
 * Тело макета
 * @namespace Lucent.UI.Body
 */
export const Body: FC<PageBodyProps> = ({ children, ...props }): ReactNode => {
  return (
    <div className={styles.layoutBody} {...props}>
      {children}
    </div>
  )
}
