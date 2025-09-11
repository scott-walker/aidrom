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
  label: string
  children: ReactNode
  error?: FieldErrorType
  className?: string
}

/**
 * Поле формы
 * @namespace Shared.UI.FormField
 */
export const FormField = ({ label, children, error, className }: FormFieldProps) => {
  const classes = makeClasses(className)
  const labelClasses = makeClasses(error && "text-danger")

  return (
    <div className={classes}>
      <FormFieldLabel text={label} className={labelClasses} error={!!error}>
        {children}
        {error && <FormFieldError error={error} />}
      </FormFieldLabel>
    </div>
  )
}
