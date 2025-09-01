import type { ComponentProps, ReactNode } from "react"
import {
  buildVariant,
  makeUiBaseClasses,
  makeUiClickableClasses,
  type ColorSchemeVariant,
  type RoundedVariant,
  type SizeVariant
} from "@lib/style-api"

/**
 * Пропсы кнопки
 * @namespace Ui.Button.Props
 */
export type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode
  scheme?: ColorSchemeVariant
  size?: SizeVariant
  rounded?: RoundedVariant
}

/**
 * Кнопка
 * @namespace Ui.Button
 * @param {Props} props.children - контент
 * @param {Props} props.scheme - цветовое решение
 * @param {Props} props.size - размер
 * @param {Props} props.rounded - скругление
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Button = ({
  children,
  scheme = "default",
  size = "default",
  rounded = "default",
  className = "",
  ...props
}: ButtonProps): ReactNode => {
  const classes = buildVariant({
    beforeClasses: makeUiBaseClasses(makeUiClickableClasses()),
    afterClasses: className,
    variant: {
      scheme,
      schemeHover: scheme,
      padding: size,
      textSize: size,
      rounded
    }
  })

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  )
}
