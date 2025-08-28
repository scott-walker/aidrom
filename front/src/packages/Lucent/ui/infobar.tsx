import type { FC, ReactNode } from "react"
import type { InfobarProps } from "../lib/types"
import { cn } from "../lib/utils"
import { useLayout } from "../lib/context"
import styles from "../style/lucent.module.css"

/**
 * Инфобар макета
 * @namespace Lucent.UI.Infobar
 */
export const Infobar: FC<InfobarProps> = ({ children }): ReactNode => {
  const { isInfobarHidden, isInfobarCollapsed } = useLayout()
  const hidden = isInfobarHidden()
  const collapsed = isInfobarCollapsed()

  const infobarClasses = cn({
    [styles.layoutInfobar]: true,
    [styles.hidden]: hidden,
    [styles.collapsed]: collapsed
  })
  const infobarInnerClasses = cn({
    [styles.layoutInfobarInner]: true,
    [styles.hidden]: hidden,
    [styles.collapsed]: collapsed
  })

  return (
    <aside className={infobarClasses}>
      <div className={infobarInnerClasses}>{children}</div>
    </aside>
  )
}
