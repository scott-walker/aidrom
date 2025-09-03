import { NavLink } from "react-router"
import { cn, cva } from "@utils/jsxtools"
import { Tooltip } from "@ui/tooltip"
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
        true: "justify-center px-3",
        false: "px-5"
      },
      active: {
        true: cn("font-bold", "cursor-default", "bg-background-hard", "text-foreground-hard"),
        false: cn("font-semibold", "text-foreground-soft", "hover:text-primary")
      }
    },
    compoundVariants: [
      {
        compact: true,
        active: false,
        class: cn("text-foreground", "hover:text-primary")
      },
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

  const iconWeight = 2
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
        {icon && compact && (
          <Tooltip text={label} side="right" offset={30} delay={50}>
            <Icon strokeWidth={iconWeight} name={icon} />
          </Tooltip>
        )}
        {icon && !compact && <Icon strokeWidth={iconWeight} name={icon} />}

        <span className={labelVariants({ compact })}>{label}</span>
      </NavLink>
    </li>
  )
}
