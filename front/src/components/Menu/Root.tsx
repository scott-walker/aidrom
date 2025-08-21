import type { FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"
import { Item, type IItem } from "./Item"

/**
 * Пропсы меню
 * @namespace Components.Menu.Root.Props
 */
type Props = {
  items: Items
  compact?: boolean
}

/**
 * Интерфейс элемента меню
 * @namespace Components.Menu.Root.IItems
 */
export type Items = IItem[]

/**
 * Корневой компонент меню
 * @namespace Components.Menu.Root
 * @returns {ReactNode}
 */
export const Root: FC<Props> = ({ items, compact = false }: Props): ReactNode => {
  const classes = cn("flex", "flex-col")
  const variants = cva(classes, {
    variants: {
      compact: {
        true: "gap-1.5",
        false: "gap-0"
      }
    },
    defaultVariants: {
      compact: false
    }
  })
  const itemList = items.map(item => {
    return <Item key={item.href} {...item} compact={compact} />
  })

  return <ul className={variants({ compact })}>{itemList}</ul>
}
