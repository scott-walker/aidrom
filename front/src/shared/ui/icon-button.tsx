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
}

/**
 * Кнопка с иконкой
 * @namespace Shared.Ui.IconButton
 */
export const IconButton = ({
  icon,
  iconSize = 36,
  iconStrokeWidth = 2,
  iconClassName = "",
  circle = false,
  scheme = "ghost",
  className = "",
  ...props
}: IconButtonProps): ReactNode => {
  const classes = makeClasses("p-0", scheme === "brand" && "p-(--ui-border-width)", circle && "rounded-full", className)

  iconClassName = makeClasses("m-2.5", iconClassName)

  return (
    <Button scheme={scheme} className={classes} {...props}>
      <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} className={iconClassName} />
    </Button>
  )
}
