import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

/**
 * Пропсы корневого компонента сайдбара
 * @namespace Components.Sidebar.Root.Props
 */
type Props = ComponentProps<"aside"> & {
  collapsed?: boolean
}

/**
 * Корневой компонент сайдбара
 * @namespace Components.Sidebar.Root
 * @returns {ReactNode}
 */
export const Root: FC<Props> = ({ children, collapsed = false, className = "", ...props }: Props): ReactNode => {
  const baseClasses = cn(
    "flex",
    "flex-col",
    "relative",
    "z-10",
    "h-full",
    "overflow-hidden",
    "shadow-2xl",
    "shadow-boom",
    "transition-width",
    "duration-110",
    className
  )
  const sidebarVariants = cva(baseClasses, {
    variants: {
      collapsed: {
        false: "w-[var(--sidebar-width)] bg-background text-foreground",
        true: "w-[var(--sidebar-collapsed-width)] bg-brand text-brand-foreground"
      }
    },
    defaultVariants: {
      collapsed: false
    }
  })

  return (
    <aside className={sidebarVariants({ collapsed })} {...props}>
      {children}
    </aside>
  )
}
