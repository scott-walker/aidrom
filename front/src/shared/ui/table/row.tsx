import type { ReactNode, JSX } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы строки таблицы
 * @namespace Shared.UI.Table.TableRowProps
 */
type TableRowProps = JSX.IntrinsicElements["tr"] & {
  children: ReactNode
  hoverable?: boolean
  className?: string
}

/**
 * Строка таблицы
 * @namespace Shared.UI.Table.TableRow
 */
export const TableRow = ({ children, hoverable = false, className = "", ...props }: TableRowProps) => {
  const classes = makeClasses(
    hoverable && [
      "hover:text-primary",
      "hover:bg-primary-ghost-soft",
      "hover:border-primary-ghost",
      "cursor-pointer",
      "hover:bg-background"
    ],
    className
  )

  return (
    <tr className={classes} {...props}>
      {children}
    </tr>
  )
}
