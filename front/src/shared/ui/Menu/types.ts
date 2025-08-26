import type { IconName } from "../Icon"

/**
 * Интерфейс элемента меню
 * @namespace Shared.UI.Menu.MenuItem
 */
export type MenuItem = {
  label: string
  path: string
  icon?: IconName | null
  compact?: boolean
}

/**
 * Интерфейс элемента меню
 * @namespace Shared.UI.Menu.MenuItems
 */
export type MenuItems = MenuItem[]

/**
 * Пропсы меню
 * @namespace Shared.UI.Menu.MenuProps
 */
export type MenuProps = {
  items: MenuItems
  compact?: boolean
}
