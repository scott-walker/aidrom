import { cn, cva } from "@utils/jsxtools"
import { Item } from "./Item"
import type { MenuProps } from "./types"

export type { MenuItem, MenuItems } from "./types"

/**
 * Корневой компонент меню
 * @namespace Shared.UI.Menu
 */
export const Menu = ({ items, compact = false }: MenuProps) => {
  const classes = cn("flex", "flex-col", compact && "items-center")
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
    return <Item key={item.path} {...item} compact={compact} />
  })

  return <ul className={variants({ compact })}>{itemList}</ul>
}
