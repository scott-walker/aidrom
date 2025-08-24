import type { FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"
import { Icon, type IconName } from "@ui/Icon"

/**
 * Интерфейс элемента меню
 * @namespace Components.Menu.Item.IItem
 */
export interface IItem {
  label: string
  href: string
  icon?: IconName | null
  active?: boolean
  compact?: boolean
}

/**
 * Элемент меню
 * @namespace Components.Menu.Item
 * @returns {ReactNode}
 */
export const Item: FC<IItem> = ({ label, href, icon = null, active = false, compact = false }: IItem): ReactNode => {
  const linkClasses = cn("flex", "items-center", "gap-4", "py-2", "select-none")
  const linkVariants = cva(linkClasses, {
    variants: {
      compact: {
        true: "px-0 justify-center",
        false: "px-5"
      },
      active: {
        true: cn("font-bold", "cursor-default", "rounded-xl", "bg-background-hard", "text-foreground-hard"),
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
  const iconClasses = cn("")
  const iconWeight = 3

  return (
    <li>
      <a className={linkVariants({ active, compact })} href={active ? undefined : href}>
        {icon && <Icon strokeWidth={iconWeight} name={icon} className={iconClasses} />}

        <span className={labelVariants({ compact })}>{label}</span>
      </a>
    </li>
  )
}
