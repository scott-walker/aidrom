import type { ComponentProps } from "react"
import { type FieldError as FieldErrorType } from "react-hook-form"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы для ошибки в поле формы
 * @namespace Shared.UI.FormFieldError.FormFieldErrorProps
 */
export type FormFieldErrorProps = Omit<ComponentProps<"span">, "size"> & {
  error: FieldErrorType | undefined
}

/**
 * Ошибка в поле формы
 * @namespace Shared.UI.FormFieldError
 */
export const FormFieldError = ({ error, className = "", ...props }: FormFieldErrorProps) => {
  if (!error) return null

  const classes = makeClasses("px-(--ui-offset-x) text-sm text-danger", className)
  const message = error && error.message ? error.message : "Ошибка"

  return (
    <span {...props} className={classes}>
      {message}
    </span>
  )
}
