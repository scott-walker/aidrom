import { type FC, type ReactNode } from "react"
import type { InfobarProps } from "./types"
import { cn } from "./utils"
import { useLayout } from "./context"
import styles from "./Lucent.module.css"
import { INFOBAR_MODE_HIDDEN } from "./constants"

/**
 * Инфобар макета
 * @namespace Lucent.Infobar
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Infobar: FC<InfobarProps> = ({ children }: InfobarProps): ReactNode => {
  const { modes } = useLayout()
  const hidden = modes.infobar === INFOBAR_MODE_HIDDEN
  const infobarClasses = cn(styles.layoutInfobar, hidden && styles.infobarHidden)
  const infobarInnerClasses = cn(styles.layoutInfobarInner, hidden && styles.infobarHidden)

  return (
    <aside className={infobarClasses}>
      <div className={infobarInnerClasses}>{children}</div>
    </aside>
  )
}
