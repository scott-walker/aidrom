import type { FC, ReactNode } from "react"
import type { PageProps } from "./types"
import { PAGE_MODE_EXPANDED } from "./constants"
import { cn } from "./utils"
import { useLayout } from "./context"
import styles from "./Lucent.module.css"

/**
 * Основная часть макета
 * @namespace Lucent.Page
 * @param {PageProps} props.children - контент страницы
 * @returns {ReactNode}
 */
export const Page: FC<PageProps> = ({ children }: PageProps): ReactNode => {
  const { modes } = useLayout()
  const expanded = modes.page === PAGE_MODE_EXPANDED
  const classes = cn(styles.layoutPage, expanded && styles.expanded)

  return <div className={classes}>{children}</div>
}
