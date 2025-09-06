import type { ReactNode, FC, JSX } from "react"
import { makeClasses } from "@lib/style-api"
import { TableHeader } from "./header"
import { TableBody } from "./body"
import { TableRow } from "./row"
import { TableHead } from "./head"
import { TableCell } from "./cell"

/**
 * Пропсы таблицы
 * @namespace Shared.UI.Table.TableProps
 */
type TableProps = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: ReactNode
  [key: string]: unknown
}

/**
 * Компонент таблицы
 * @namespace Shared.UI.Table.TableComponent
 */
type TableComponent = FC<TableProps> & {
  Header: typeof TableHeader
  Body: typeof TableBody
  Row: typeof TableRow
  Head: typeof TableHead
  Cell: typeof TableCell
}

/**
 * Таблица
 * @namespace Shared.UI.Table.Table
 */
export const Table: TableComponent = ({ children, as: Component = "div", className = "", ...props }) => {
  const classes = makeClasses(className)

  return (
    <Component {...props} className={classes}>
      <table className="w-full">{children}</table>
    </Component>
  )
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Head = TableHead
Table.Cell = TableCell
