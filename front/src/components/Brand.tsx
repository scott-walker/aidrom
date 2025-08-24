import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"
import { Icon } from "@ui/Icon"

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
    "flex",
    "items-center",
    "justify-center",
    "select-none",
    // compact && "bg-gradient-brand w-full h-full",
    compact && "rounded-xl bg-gradient-brand",
    className
  )
  const iconClasses = cn("p-2", "w-fit", "h-fit", "text-primary-foreground", compact || "rounded-xl bg-gradient-brand")
  const labelVariants = cva("font-family-display font-mega-bold text-foreground-hard", {
    variants: {
      size: {
        sm: "text-lg ml-2.5",
        md: "text-2xl ml-3.5",
        lg: "text-5xl ml-5.5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  })

  const iconName = "bot-message-square"
  const iconStroke = 2.5
  const iconSizeVariants = (size: "sm" | "md" | "lg"): number => {
    const map = {
      sm: 8,
      md: 38,
      lg: 22
    }

    return map[size] || map.md
  }

  return (
    <div className={containerClasses} {...props}>
      <Icon name={iconName} className={iconClasses} strokeWidth={iconStroke} size={iconSizeVariants(size)} />

      {compact || <span className={labelVariants({ size })}>AIDrom</span>}
    </div>
  )
}
