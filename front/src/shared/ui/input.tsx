import type { ComponentProps } from "react"
import { makeClasses, makeUiBox, makeUiTransition, makeUiHoverableAnimation } from "@lib/style-api"

/**
 * Пропсы текстового поля
 * @namespace Shared.UI.Input.Props
 */
export type InputProps = Omit<ComponentProps<"input">, "size"> & {
  error?: boolean
}

/**
 * Текстовое поле для ввода
 * @namespace Shared.UI.Input
 */
export const Input = ({
  error = false,
  className = "",
  autoComplete = "off",
  placeholder = "Введите текст",
  ...props
}: InputProps) => {
  const classes = makeClasses(
    makeUiBox(),
    makeUiHoverableAnimation(),
    makeUiTransition(),
    "w-full",
    "bg-background",
    "text-foreground-hard",
    "placeholder:text-(--ui-placeholder-color)",
    "placeholder:text-(length:--ui-placeholder-text-size)",
    error && "border-danger",
    error ? "hover:border-danger" : "hover:border-primary",
    error ? "focus:border-danger" : "focus:border-primary",
    className
  )

  return <input {...props} className={classes} autoComplete={autoComplete} placeholder={placeholder} />
}
