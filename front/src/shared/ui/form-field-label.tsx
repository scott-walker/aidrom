import type { ComponentProps } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы для названия поля формы
 * @namespace Shared.UI.FormFieldLabel.FormFieldLabelProps
 */
export type FormFieldLabelProps = Omit<ComponentProps<"label">, "size"> & {
  children: string
}

/**
 * Название поля формы
 * @namespace Shared.UI.FormFieldLabel
 */
export const FormFieldLabel = ({ children, className = "", ...props }: FormFieldLabelProps) => {
  const classes = makeClasses("px-(--ui-offset-x) text-sm font-semibold", className)

  return (
    <label {...props} className={classes}>
      {children}
    </label>
  )
}
