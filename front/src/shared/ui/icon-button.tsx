import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { Icon, type IconName } from "@ui/icon"
import { Button, type ButtonProps } from "@ui/button"

/**
 * Пропсы кнопки
 * @namespace Shared.Ui.IconButton.Props
 */
export type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: IconName
  iconSize?: number
  iconStrokeWidth?: number
  iconClassName?: string
  circle?: boolean
  disabled?: boolean
}

/**
 * Кнопка с иконкой
 * @namespace Shared.Ui.IconButton
 */
export const IconButton = ({
  icon,
  iconSize = 28,
  iconStrokeWidth = 2.5,
  iconClassName = "",
  circle = false,
  schema = "ghost",
  className = "",
  disabled = false,
  ...props
}: IconButtonProps): ReactNode => {
  const isGhost = schema === "ghost"
  const isBrand = schema === "brand"

  const classes = makeClasses(
    "p-0",
    "m-0",
    "w-7",
    "h-7",
    "shadow-none",
    isBrand && "p-(--ui-border-width)",
    isGhost && "hover:text-primary",
    circle && "rounded-full",
    className
  )

  return (
    <Button schema={schema} className={classes} disabled={disabled} {...props}>
      <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} className={iconClassName} />
    </Button>
  )
}
