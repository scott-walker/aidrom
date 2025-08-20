import type { FC, JSX } from "react"
import { cva } from "class-variance-authority"
import { BotMessageSquare } from "lucide-react"

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
  const iconSizes = cva("text-brand", {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-22 h-22"
      }
    }
  })
  const textSizes = cva("font-bold text-foreground font-display", {
    variants: {
      size: {
        sm: "text-lg ml-2.5",
        md: "text-2xl ml-3.5",
        lg: "text-5xl ml-5.5"
      }
    }
  })

  return (
    <div className="flex items-center w-max-[100%]">
      <BotMessageSquare className={iconSizes({ size })} />
      <span className={textSizes({ size })}>AIDrom</span>
    </div>
  )
}
