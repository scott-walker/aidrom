import { makeClasses } from "@lib/style-api"
import { Item } from "./Item"
import type { MenuProps } from "./types"

/**
 * Корневой компонент меню
 * @namespace Shared.UI.Menu
 */
export const Menu = ({ items, compact = false }: MenuProps) => {
  const classes = makeClasses("flex", "flex-col", compact && "items-center")
  const itemList = items.map(item => {
    return <Item key={item.path} {...item} compact={compact} />
  })

  return <ul className={classes}>{itemList}</ul>
}
