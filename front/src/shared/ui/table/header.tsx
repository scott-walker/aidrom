import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы заголовка таблицы
 * @namespace Shared.UI.Table.TableHeaderProps
 */
type TableHeaderProps = {
  children: ReactNode
  className?: string
}

/**
 * Заголовок таблицы
 * @namespace Shared.UI.Table.TableHeader
 */
export const TableHeader = ({ children, className = "" }: TableHeaderProps) => {
  const classes = makeClasses(
    "border-b-(length:--ui-table-border-width)",
    "border-(--ui-table-border-color)",
    className
  )

  return <thead className={classes}>{children}</thead>
}
