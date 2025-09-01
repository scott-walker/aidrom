import type { ComponentProps, FC, ReactNode } from "react"
import { Icon, type IconName } from "@shared/ui/icon"
import {
  buildVariant,
  makeUiBaseClasses,
  makeUiClickableClasses,
  makeClasses,
  type ColorSchemeVariant,
  type RoundedVariant
} from "@lib/style-api"

/**
 * Пропсы кнопки
 * @namespace Ui.Button.Props
 */
export type Props = ComponentProps<"button"> & {
  icon: IconName
  iconSize?: number
  iconStrokeWidth?: number
  iconClassName?: string
  circle?: boolean
  scheme?: ColorSchemeVariant
  schemeHover?: ColorSchemeVariant
  rounded?: RoundedVariant
}

/**
 * Кнопка с иконкой
 * @namespace Ui.Button
 * @param {Props} props.children - контент
 * @param {Props} props.scheme - цветовое решение
 * @param {Props} props.size - размер
 * @param {Props} props.rounded - скругление
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const IconButton: FC<Props> = ({
  icon,
  iconSize = 36,
  iconStrokeWidth = 2,
  iconClassName = "",
  circle = false,
  scheme = "ghost",
  schemeHover = "none",
  className = "",
  ...props
}: Props): ReactNode => {
  iconClassName = makeClasses(iconClassName, {
    "m-1.5": circle
  })

  const classes = buildVariant({
    beforeClasses: makeClasses(makeUiBaseClasses(), makeUiClickableClasses()),
    afterClasses: className,
    variant: {
      scheme,
      schemeHover,
      padding: "none",
      textSize: "none",
      rounded: circle ? "full" : "sm"
    }
  })

  return (
    <button className={classes} {...props}>
      <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} className={iconClassName} />
    </button>
  )
}
