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
  showError?: boolean
  className?: string
}

/**
 * Поле формы
 * @namespace Shared.UI.FormField
 */
export const FormField = ({ label, children, error, showError = true, className }: FormFieldProps) => {
  const labelClasses = makeClasses("flex", "flex-col", "gap-1", error && "text-danger", className)

  return (
    <FormFieldLabel text={label} className={labelClasses} error={!!error}>
      {children}
      {error && showError && <FormFieldError error={error} />}
    </FormFieldLabel>
  )
}
