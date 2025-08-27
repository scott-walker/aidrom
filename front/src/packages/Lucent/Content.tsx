import type { ReactNode } from "react"
import type { ContentProps } from "./types"
import { Scrollbar } from "./Scrollbar"
import styles from "./Lucent.module.css"

/**
 * Контент макета
 * @namespace Lucent.Content
 * @param {ContentProps} props.children - контент
 * @returns {ReactNode}
 */
export const Content = ({ children }: ContentProps): ReactNode => {
  return (
    <main className={styles.layoutContent}>
      <Scrollbar>
        <div className={styles.layoutContentInner}>{children}</div>
      </Scrollbar>
    </main>
  )
}
