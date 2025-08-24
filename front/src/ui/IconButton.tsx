import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Button, type Size, type Variant } from "@ui/Button"
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
  className = "",
  iconSize = 24,
  iconStrokeWidth = 3,
  iconClassName = "",
  ...props
}: Props): ReactNode => {
  const buttonClasses = cn("p-0 w-10 h-10", className)
  const iconClasses = cn(iconClassName)

  return (
    <Button variant={variant} size={size} className={buttonClasses} {...props}>
      <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} className={iconClasses} />
    </Button>
  )
}
