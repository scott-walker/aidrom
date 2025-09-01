import type { ComponentProps, ReactNode } from "react"
import {
  composeVariants,
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
  scheme = "ghost",
  size = "md",
  rounded = "sm",
  className = "",
  ...props
}: ButtonProps): ReactNode => {
  const useVariant = composeVariants({
    beforeClasses: makeUiBaseClasses(makeUiClickableClasses()),
    afterClasses: className,
    defaultVariants: {
      scheme: "ghost",
      schemeHover: "ghost",
      padding: "md",
      textSize: "md",
      rounded: "sm"
    }
  })

  return (
    <button
      {...props}
      className={useVariant({
        scheme,
        schemeHover: scheme,
        padding: size,
        textSize: size,
        rounded
      })}
    >
      {children}
    </button>
  )
}
