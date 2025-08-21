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
  const iconClasses = cva("", {
    variants: {
      inverted: {
        true: "text-brand-foreground",
        false: "text-brand"
      },
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-22 h-22"
      }
    },
    defaultVariants: {
      inverted: false,
      size: "md"
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
      <Icon name="bot-message-square" className={iconClasses({ size, inverted })} />

      {compact || <span className={textClasses({ size, inverted })}>AIDrom</span>}
    </div>
  )
}
