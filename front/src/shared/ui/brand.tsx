import type { ComponentProps, FC, ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { Icon } from "@ui/icon"

/**
 * Пропсы бренда
 * @namespace Components.Brand.Props
 * @property {boolean} compact - компактный вариант (только иконка)
 * @property {("sm" | "md" | "lg")} size - размер логотипа
 */
type Props = ComponentProps<"div"> & {
  compact?: boolean
  withIcon?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * Бренд (логотип)
 * @namespace Components.Brand
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Brand: FC<Props> = ({
  compact = false,
  withIcon = true,
  size = "md",
  className = "",
  ...props
}: Props): ReactNode => {
  const containerClasses = makeClasses(
    "relative",
    "flex",
    "items-center",
    "justify-center",
    "select-none",
    compact && "rounded-xl bg-brand-gradient",
    className
  )

  const iconName = "bot-message-square"
  const iconStroke = 2.5
  const iconClasses = makeClasses(
    "p-2",
    "w-fit",
    "h-fit",
    "text-primary-foreground",
    "rounded-xl",
    !compact && "bg-brand-gradient",
    compact && "bg-none"
  )

  const iconSizeVariants = (size: "sm" | "md" | "lg"): number => {
    const map = {
      sm: 32,
      md: 38,
      lg: 42
    }

    return map[size] || map.md
  }

  const labelClasses = makeClasses(
    "flex",
    "flex-col",
    "items-start",
    "justify-center",
    withIcon && "ml-3.5",
    "font-family-display",
    compact && "hidden"
  )
  const titleClasses = makeClasses(
    "font-mega-bold",
    "text-foreground-hard",
    size === "sm" && "text-lg",
    size === "md" && "text-2xl",
    size === "lg" && "text-5xl"
  )
  const subtitleClasses = makeClasses("relative text-foreground -top-1 text-xs")

  return (
    <div className={containerClasses} {...props}>
      {withIcon && (
        <Icon name={iconName} className={iconClasses} strokeWidth={iconStroke} size={iconSizeVariants(size)} />
      )}

      <div className={labelClasses}>
        <span className={titleClasses}>AIDrom</span>
        <span className={subtitleClasses}>version 0.1</span>
      </div>
    </div>
  )
}
