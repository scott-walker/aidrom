import type { FC, ReactNode } from "react"
import { cva } from "@utils/jsxtools"
import { Icon } from "@ui/Icon"

/**
 * Пропсы бренда
 * @namespace Components.Brand.Props
 * @property {boolean} compact - компактный вариант (только иконка)
 * @property {("sm" | "md" | "lg")} size - размер логотипа
 */
type Props = {
  compact?: boolean
  inverted?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * Бренд (логотип)
 * @namespace Components.Brand
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Brand: FC<Props> = ({ compact = false, inverted = false, size = "md" }: Props): ReactNode => {
  const iconStroke = 2.5
  const iconSizes = (size: "sm" | "md" | "lg"): number => {
    const map = {
      sm: 8,
      md: 38,
      lg: 22
    }

    return map[size] || map.md
  }

  const iconClasses = cva("w-fit h-fit", {
    variants: {
      inverted: {
        true: "text-brand-foreground",
        false: "text-brand-foreground bg-gradient-brand rounded-xl p-2"
      }
    },
    defaultVariants: {
      inverted: false
    }
  })
  const textClasses = cva("font-family-display font-mega-bold", {
    variants: {
      inverted: {
        true: "text-brand-foreground",
        false: "text-foreground"
      },
      size: {
        sm: "text-lg ml-2.5",
        md: "text-2xl ml-3",
        lg: "text-5xl ml-5.5"
      }
    },
    defaultVariants: {
      inverted: false,
      size: "md"
    }
  })

  return (
    <div className="flex items-center justify-center w-fit h-fit select-none">
      <Icon
        name="bot-message-square"
        className={iconClasses({ inverted })}
        strokeWidth={iconStroke}
        size={iconSizes(size)}
      />

      {compact || <span className={textClasses({ size, inverted })}>AIDrom</span>}
    </div>
  )
}
