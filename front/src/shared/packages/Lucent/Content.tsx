import type { ComponentProps, FC, ReactNode } from "react"
import { Scrollbar } from "@ui/Scrollbar"
import styles from "./Lucent.module.css"

/**
 * Пропсы контента
 * @namespace Layouts.Lucent.Content.Props
 */
type Props = ComponentProps<"div">

/**
 * Контент макета
 * @namespace Layouts.Lucent.Content
 * @returns {ReactNode}
 */
export const Content: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return (
    <main className={styles.layoutContent} {...props}>
      <Scrollbar>
        <div className={styles.layoutContentInner}>{children}</div>
      </Scrollbar>
    </main>
  )
}
