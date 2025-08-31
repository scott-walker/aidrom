import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"
import { Button, type Size, type Variant, type Rounded } from "@shared/ui/button"
import { Icon, type IconName } from "@shared/ui/icon"

/**
 * Пропсы кнопки с иконкой
 * @namespace Ui.IconButton.Props
 */
export type Props = ComponentProps<"button"> & {
  icon: IconName
  variant?: Variant
  size?: Size
  iconSize?: number
  iconStrokeWidth?: number
  iconClassName?: string
  rounded?: Rounded
  circle?: boolean
  full?: boolean
  hoverVariant?: "content" | "outline" | "filled" | null
}

/**
 * Кнопка с иконкой
 * @namespace Ui.IconButton
 * @param {Props} props.children - контент
 * @param {Props} props.variant - вариант
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const IconButton: FC<Props> = ({
  icon,
  variant = "ghost",
  size = "md",
  rounded = "sm",
  hoverVariant = "content",
  circle = false,
  full = false,
  className = "",
  iconSize = 24,
  iconStrokeWidth = 2,
  iconClassName = "",
  ...props
}: Props): ReactNode => {
  if (circle) rounded = "full"
  if (full) size = "none"

  const buttonVariants = cva("p-0 w-10 h-10 transition-colors duration-200", {
    variants: {
      hoverVariant: {
        content: cn("hover:text-primary"),
        outline: cn("hover:text-primary", "hover:border-primary"),
        filled: cn("hover:text-primary-foreground", "hover:bg-primary")
      },
      circle: {
        true: "w-12 h-12"
      },
      full: {
        false: "w-10 h-10",
        true: "w-fit h-fit"
      }
    },
    defaultVariants: {
      hoverVariant: null,
      circle: false,
      full: false
    }
  })
  const buttonClasses = cn(buttonVariants({ hoverVariant, circle, full }), className)
  const iconClasses = cn(iconClassName)

  return (
    <Button variant={variant} size={size} rounded={rounded} className={buttonClasses} {...props}>
      <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} className={iconClasses} />
    </Button>
  )
}
