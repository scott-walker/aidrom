import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы строки
 * @namespace Shared.UI.Blocks.RowProps
 */
type RowProps = {
  children: ReactNode
  className?: string
}
/**
 * Пропсы столбца
 * @namespace Shared.UI.Blocks.ColumnProps
 */
type ColumnProps = {
  children: ReactNode
  className?: string
}

/**
 * Пропсы блоков
 * @namespace Shared.UI.Blocks.Props
 */
type BlocksProps = {
  children: ReactNode
  columns?: boolean
  className?: string
}

/**
 * Строка
 * @namespace Shared.UI.Blocks.Row
 */
const Row = ({ children, className }: RowProps) => {
  const classes = makeClasses(
    "flex",
    "flex-row",
    "w-full",
    "items-start",
    "justify-start",
    "gap-(--layout-blocks-gap)",
    className
  )

  return <div className={classes}>{children}</div>
}

/**
 * Столбец
 * @namespace Shared.UI.Blocks.Column
 */
const Column = ({ children, className }: ColumnProps) => {
  const classes = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    "items-start",
    "justify-start",
    "gap-(--layout-blocks-gap)",
    className
  )

  return <div className={classes}>{children}</div>
}

/**
 * Блок
 * @namespace Shared.UI.Blocks.Block
 */
const Block = ({ children, className }: BlocksProps) => {
  const classes = makeClasses("w-full", className)

  return <div className={classes}>{children}</div>
}

/**
 * Блоки
 * @namespace Shared.UI.Blocks
 */
export const Blocks = ({ children, className }: BlocksProps) => {
  const classes = makeClasses(
    "flex",
    "flex-col",
    "w-full",
    "h-full",
    "items-start",
    "justify-start",
    "gap-(--layout-blocks-gap)",
    className
  )

  return <div className={classes}>{children}</div>
}

Blocks.Column = Column
Blocks.Row = Row
Blocks.Block = Block
