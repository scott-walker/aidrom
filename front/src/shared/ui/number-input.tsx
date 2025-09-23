import type { ComponentProps } from "react"
import { makeClasses, makeUiBox, makeUiTransition, makeUiHoverableAnimation } from "@lib/style-api"

/**
 * Пропсы числового поля
 * @namespace Shared.UI.NumberInput.Props
 */
export type NumberInputProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  error?: boolean
  min?: number
  max?: number
  step?: number
}

/**
 * Числовое поле для ввода
 * @namespace Shared.UI.NumberInput
 */
export const NumberInput = ({
  error = false,
  className = "",
  autoComplete = "off",
  placeholder = "Введите число",
  min,
  max,
  step = 1,
  ...props
}: NumberInputProps) => {
  const classes = makeClasses(
    makeUiBox(),
    makeUiHoverableAnimation(),
    makeUiTransition(),
    "w-32",
    "bg-background",
    "text-foreground-hard",
    "placeholder:text-(--ui-placeholder-color)",
    "placeholder:text-(length:--ui-placeholder-text-size)",
    error && "border-danger",
    error ? "hover:border-danger" : "hover:border-primary",
    error ? "focus:border-danger" : "focus:border-primary",

    "[appearance:textfield]",
    "[&::-webkit-outer-spin-button]:appearance-none",
    "[&::-webkit-inner-spin-button]:appearance-none",
    className
  )

  return (
    <input
      {...props}
      type="number"
      className={classes}
      autoComplete={autoComplete}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
    />
  )
}
