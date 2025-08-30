import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Icon } from "@shared/ui/icon"

/**
 * Пропсы бренда
 * @namespace Components.Brand.Props
 * @property {boolean} compact - компактный вариант (только иконка)
 * @property {("sm" | "md" | "lg")} size - размер логотипа
 */
type Props = ComponentProps<"div"> & {
  compact?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * Бренд (логотип)
 * @namespace Components.Brand
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Brand: FC<Props> = ({ compact = false, size = "md", className = "", ...props }: Props): ReactNode => {
  const containerClasses = cn(
    "relative",
    "flex",
    "items-center",
    "justify-center",
    "select-none",
    // compact && "bg-gradient-brand w-full h-full",
    compact && "rounded-xl bg-gradient-brand",
    className
  )

  const iconName = "bot-message-square"
  const iconStroke = 2.5
  const iconClasses = cn("p-2", "w-fit", "h-fit", "text-primary-foreground", "rounded-xl", {
    "bg-gradient-brand": !compact,
    "bg-none": compact
  })

  const iconSizeVariants = (size: "sm" | "md" | "lg"): number => {
    const map = {
      sm: 8,
      md: 38,
      lg: 22
    }

    return map[size] || map.md
  }

  const labelClasses = cn(
    "flex",
    "flex-col",
    "items-start",
    "justify-center",
    "ml-3.5",
    "font-family-display",
    compact && "hidden"
  )
  const titleClasses = cn("font-mega-bold", "text-foreground-hard", {
    "text-lg": size === "sm",
    "text-2xl": size === "md",
    "text-5xl": size === "lg"
  })
  const subtitleClasses = cn("relative text-foreground -top-1 text-xs")

  return (
    <div className={containerClasses} {...props}>
      <Icon name={iconName} className={iconClasses} strokeWidth={iconStroke} size={iconSizeVariants(size)} />

      <div className={labelClasses}>
        <span className={titleClasses}>AIDrom</span>
        <span className={subtitleClasses}>version 0.1</span>
      </div>
    </div>
  )
}
