import { type FieldError as FieldErrorType } from "react-hook-form"
import { makeClasses } from "@lib/style-api"
import { FormFieldLabel } from "./form-field-label"
import { FormFieldError } from "./form-field-error"
import { Input, type InputProps } from "./input"

/**
 * Пропсы поля формы
 * @namespace Shared.UI.FormField.FormFieldProps
 */
type FormFieldProps = InputProps & {
  label: string
  className?: string
  error?: FieldErrorType
}

/**
 * Поле формы
 * @namespace Shared.UI.FormField
 */
export const FormFieldInput = ({ label, error, className, ...props }: FormFieldProps) => {
  const classes = makeClasses("flex", "flex-col", "gap-1", className)
  const labelClasses = makeClasses("group-hover:text-primary", error && "text-danger")
  const inputClasses = makeClasses("group")

  return (
    <div className={classes}>
      <FormFieldLabel text={label} className={labelClasses}>
        <Input error={!!error} {...props} className={inputClasses} />
        {error && <FormFieldError error={error} />}
      </FormFieldLabel>
    </div>
  )
}
