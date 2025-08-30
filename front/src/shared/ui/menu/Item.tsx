import { NavLink } from "react-router"
import { cn, cva } from "@utils/jsxtools"
import { Icon } from "@ui/icon"
import type { MenuItem } from "./types"

/**
 * Элемент меню
 * @namespace Shared.UI.Menu.MenuItem
 */
export const Item = ({ label, path, icon = null, compact = false }: MenuItem) => {
  // Link
  const linkClasses = cn("flex", "items-center", "gap-4", "py-2", "select-none", "rounded-xl")
  const linkVariants = cva(linkClasses, {
    variants: {
      compact: {
        true: "px-0 justify-center",
        false: "px-5"
      },
      active: {
        true: cn("font-bold", "cursor-default", "bg-background-hard", "text-foreground-hard"),
        false: cn("font-semibold", "text-foreground-soft", "hover:text-primary")
      }
    },
    compoundVariants: [
      // {
      //   compact: true,
      //   active: true,
      //   class: cn("bg-background-hard", "text-foreground-hard", "dark:bg-primary", "dark:text-foreground-hard")
      // },
      {
        compact: true,
        active: false,
        class: cn("text-foreground", "hover:text-primary")
      },
      // {
      //   compact: false,
      //   active: true,
      //   class: cn("bg-background-hard", "text-foreground-hard", "dark:bg-background-soft", "dark:text-foreground-hard")
      // },
      {
        compact: false,
        active: false,
        class: cn("text-foreground-soft", "hover:text-primary")
      }
    ],
    defaultVariants: {
      compact: false,
      active: false
    }
  })
  const linkClassHandler = ({ isActive }: { isActive: boolean }) => linkVariants({ active: isActive, compact })

  // Icon
  const iconClasses = cn("")
  const iconWeight = 3

  // Label
  const labelClasses = cn("text-base")
  const labelVariants = cva(labelClasses, {
    variants: {
      compact: {
        true: "hidden",
        false: "block"
      }
    },
    defaultVariants: {
      compact: false
    }
  })

  return (
    <li>
      <NavLink className={linkClassHandler} to={path}>
        {icon && <Icon strokeWidth={iconWeight} name={icon} className={iconClasses} />}

        <span className={labelVariants({ compact })}>{label}</span>
      </NavLink>
    </li>
  )
}
