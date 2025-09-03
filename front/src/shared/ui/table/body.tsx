import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы тела таблицы
 * @namespace Shared.UI.Table.TableBodyProps
 */
type TableBodyProps = {
  children: ReactNode
  className?: string
}

/**
 * Тело таблицы
 * @namespace Shared.UI.Table.TableBody
 */
export const TableBody = ({ children, className = "" }: TableBodyProps) => {
  const classes = makeClasses(
    "divide-y-(length:--ui-table-border-width)",
    "divide-(--ui-table-border-color)",
    className
  )

  return <tbody className={classes}>{children}</tbody>
}
