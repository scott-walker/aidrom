import type { ReactNode, JSX } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы ячейки данных
 * @namespace Shared.UI.Table.TableCellProps
 */
type TableCellProps = JSX.IntrinsicElements["td"] & {
  children: ReactNode
  className?: string
}

/**
 * Ячейка данных
 * @namespace Shared.UI.Table.TableCell
 */
export const TableCell = ({ children, className = "", ...props }: TableCellProps) => {
  const classes = makeClasses("px-(--ui-table-offset-x)", "py-(--ui-table-offset-y)", className)

  return (
    <td className={classes} {...props}>
      {children}
    </td>
  )
}
