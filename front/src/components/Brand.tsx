import type { FC, JSX } from "react"
import { cva } from "@utils/jsxtools"
import { Icon } from "@ui/Icon"

/**
 * Пропсы
 * @namespace Components.Brand.Props
 */
type Props = {
  size?: "sm" | "md" | "lg"
}

/**
 * Компонент для отображения бренда
 * @namespace Components.Brand
 * @param {Props} props.size - размер бренда
 * @returns {JSX.Element}
 */
export const Brand: FC<Props> = ({ size = "md" }: Props): JSX.Element => {
  const iconClasses = cva("text-brand", {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-22 h-22"
      }
    },
    defaultVariants: {
      size: "md"
    }
  })
  const textClasses = cva("font-bold text-foreground font-family-display", {
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

  return (
    <div className="flex items-center w-max-[100%]">
      <Icon name="bot-message-square" className={iconClasses({ size })} />
      <span className={textClasses({ size })}>AIDrom</span>
    </div>
  )
}
