import { type ReactNode } from "react"
import { type FieldError as FieldErrorType } from "react-hook-form"
import { FormFieldLabel } from "./form-field-label"
import { FormFieldError } from "./form-field-error"
import { makeClasses } from "@shared/lib/style-api"

/**
 * Пропсы поля формы
 * @namespace Shared.UI.FormField.FormFieldProps
 */
type FormFieldProps = {
  label?: string
  children: ReactNode
  error?: FieldErrorType
  className?: string
}

/**
 * Поле формы
 * @namespace Shared.UI.FormField
 */
export const FormField = ({ label, children, error, className }: FormFieldProps) => {
  const classes = makeClasses("flex flex-col gap-1", className)
  const labelClasses = makeClasses("text-sm text-foreground-hard", error && "text-danger")

  return (
    <div className={classes}>
      {label && <FormFieldLabel className={labelClasses}>{label}</FormFieldLabel>}
      {children}
      {error && <FormFieldError error={error} />}
    </div>
  )
}
