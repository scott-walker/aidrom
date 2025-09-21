import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import { Tooltip } from "@ui/tooltip"
import { Icon } from "@ui/icon"
import type { MenuItem } from "./types"

/**
 * Элемент меню
 * @namespace Shared.UI.Menu.MenuItem
 */
export const Item = ({ label, path, icon }: MenuItem) => {
  const iconWeight = 2
  const linkClassHandler = ({ isActive }: { isActive: boolean }) => {
    return makeClasses(
      "flex",
      "items-center",
      "justify-center",
      "px-3",
      "py-2",
      "select-none",
      "rounded-xl",
      "hover:text-primary",
      isActive ? "font-bold" : "font-semibold",
      isActive ? "bg-background" : "bg-transparent",
      isActive ? "text-foreground-hard" : "text-foreground-soft"
    )
  }

  return (
    <li>
      <NavLink className={linkClassHandler} to={path}>
        <Tooltip text={label} side="right" offset={30} delay={50}>
          <Icon strokeWidth={iconWeight} name={icon} />
        </Tooltip>
      </NavLink>
    </li>
  )
}
