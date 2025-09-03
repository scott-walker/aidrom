import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы ячейки данных
 * @namespace Shared.UI.Table.TableCellProps
 */
type TableCellProps = {
  children: ReactNode
  className?: string
}

/**
 * Ячейка данных
 * @namespace Shared.UI.Table.TableCell
 */
export const TableCell = ({ children, className = "" }: TableCellProps) => {
  const classes = makeClasses("px-(--ui-table-offset-x)", "py-(--ui-table-offset-y)", className)

  return <td className={classes}>{children}</td>
}
