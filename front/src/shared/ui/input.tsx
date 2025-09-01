import type { ComponentProps } from "react"
import {
  buildVariant,
  makeClasses,
  makeUiBaseClasses,
  makeUiFocusableClasses,
  makeUiHoverableClasses,
  type ColorSchemeVariant,
  type RoundedVariant,
  type SizeVariant
} from "@lib/style-api"

/**
 * Пропсы текстового поля
 * @namespace Shared.UI.Input.Props
 */
export type InputProps = Omit<ComponentProps<"input">, "size"> & {
  scheme?: ColorSchemeVariant
  outlined?: boolean
  size?: SizeVariant
  rounded?: RoundedVariant
  error?: boolean
  full?: boolean
}

/**
 * Текстовое поле для ввода
 * @namespace Shared.UI.Input
 * @param {Props} props.scheme - цветовое решение
 * @param {Props} props.outlined - с обводкой
 * @param {Props} props.size - размер
 * @param {Props} props.rounded - скругление
 * @param {Props} props.error - состояние ошибки
 * @param {Props} props.fullWidth - на всю ширину
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Input = ({
  scheme = "default",
  size = "default",
  rounded = "default",
  error = false,
  full = false,
  className = "",
  ...props
}: InputProps) => {
  scheme = error ? "danger" : scheme

  const inputClasses = makeClasses(
    full ? "w-full" : "w-auto",
    error ? "border-danger focus:border-danger hover:border-danger" : ""
  )

  const classes = buildVariant({
    beforeClasses: makeUiBaseClasses(makeUiFocusableClasses(makeUiHoverableClasses())),
    afterClasses: makeClasses(className, inputClasses),
    outlined: true,
    variant: {
      scheme,
      schemeHover: scheme,
      padding: size,
      textSize: size,
      rounded
    }
  })

  return <input {...props} className={classes} />
}
