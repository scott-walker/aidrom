import type { ReactNode } from "react"
import type { ContentProps } from "../lib/types"
import { Scrollbar } from "./scrollbar"
import styles from "../style/lucent.module.css"

/**
 * Основной контент в макете
 * @namespace Lucent.UI.Content
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
