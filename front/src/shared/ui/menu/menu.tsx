import { makeClasses } from "@lib/style-api"
import { Item } from "./Item"
import type { MenuProps } from "./types"

/**
 * Корневой компонент меню
 * @namespace Shared.UI.Menu
 */
export const Menu = ({ items }: MenuProps) => {
  const classes = makeClasses("flex", "flex-col")

  return (
    <ul className={classes}>
      {items.map(item => (
        <Item key={item.path} {...item} />
      ))}
    </ul>
  )
}
