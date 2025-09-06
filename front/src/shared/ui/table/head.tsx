import type { ReactNode, JSX } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы ячейки заголовка
 * @namespace Shared.UI.Table.TableHeadProps
 */
type TableHeadProps = JSX.IntrinsicElements["th"] & {
  children: ReactNode
  className?: string
}

/**
 * Ячейка заголовка
 * @namespace Shared.UI.Table.TableHead
 */
export const TableHead = ({ children, className = "", ...props }: TableHeadProps) => {
  const classes = makeClasses(
    "px-(--ui-table-offset-x)",
    "py-(--ui-table-offset-y)",
    "text-left",
    "font-semibold",
    className
  )

  return (
    <th className={classes} {...props}>
      {children}
    </th>
  )
}
