import type { FC, ReactNode } from "react"
import type { PageBodyProps } from "./types"
import styles from "./Lucent.module.css"

/**
 * Тело макета
 * @namespace Lucent.Body
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Body: FC<PageBodyProps> = ({ children, ...props }: PageBodyProps): ReactNode => {
  return (
    <div className={styles.layoutBody} {...props}>
      {children}
    </div>
  )
}
