import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы строки таблицы
 * @namespace Shared.UI.Table.TableRowProps
 */
type TableRowProps = {
  children: ReactNode
  hoverable?: boolean
  className?: string
}

/**
 * Строка таблицы
 * @namespace Shared.UI.Table.TableRow
 */
export const TableRow = ({ children, hoverable = false, className = "" }: TableRowProps) => {
  const classes = makeClasses(hoverable ? "hover:bg-background" : "", className)

  return <tr className={classes}>{children}</tr>
}
