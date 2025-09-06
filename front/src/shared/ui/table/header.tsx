import type { ReactNode, JSX } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы заголовка таблицы
 * @namespace Shared.UI.Table.TableHeaderProps
 */
type TableHeaderProps = JSX.IntrinsicElements["thead"] & {
  children: ReactNode
  className?: string
}

/**
 * Заголовок таблицы
 * @namespace Shared.UI.Table.TableHeader
 */
export const TableHeader = ({ children, className = "", ...props }: TableHeaderProps) => {
  const classes = makeClasses(
    "border-b-(length:--ui-table-border-width)",
    "border-(--ui-table-border-color)",
    className
  )

  return (
    <thead className={classes} {...props}>
      {children}
    </thead>
  )
}
