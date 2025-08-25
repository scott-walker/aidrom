import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"
import { Button, type Size, type Variant, type Rounded } from "@ui/Button"
import { Icon, type IconName } from "@ui/Icon"

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
  hoverVariant?: "text" | "outline" | "filled"
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
  hoverVariant = "outline",
  circle = false,
  className = "",
  iconSize = 24,
  iconStrokeWidth = 3,
  iconClassName = "",
  ...props
}: Props): ReactNode => {
  if (circle) rounded = "full"

  const buttonVariants = cva("p-0 w-10 h-10 transition-colors duration-200", {
    variants: {
      hoverVariant: {
        text: cn("hover:text-primary"),
        outline: cn("hover:text-primary", "hover:border-primary"),
        filled: cn("hover:text-primary-foreground", "hover:bg-primary")
      },
      circle: {
        true: "w-12 h-12"
      }
    },
    defaultVariants: {
      hoverVariant: "text",
      circle: false
    }
  })
  const buttonClasses = cn(buttonVariants({ hoverVariant, circle }), className)
  const iconClasses = cn(iconClassName)

  // "ghost-filled": cn(
  //   "bg-transparent",
  //   "text-foreground",
  //   "dark:shadow-none",
  //   "hover:text-primary-foreground",
  //   "hover:text-primary"
  // ),
  // "ghost-outline": cn(
  //   "bg-transparent",
  //   "text-foreground",
  //   "dark:shadow-none",
  //   "hover:text-primary-foreground",
  //   "hover:text-primary",
  //   "hover:border-primary"
  // ),

  return (
    <Button variant={variant} size={size} rounded={rounded} className={buttonClasses} {...props}>
      <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} className={iconClasses} />
    </Button>
  )
}
