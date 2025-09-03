import type { ComponentProps, ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы для названия поля формы
 * @namespace Shared.UI.FormFieldLabel.FormFieldLabelProps
 */
export type FormFieldLabelProps = Omit<ComponentProps<"label">, "size"> & {
  text: string
  children: ReactNode
}

/**
 * Название поля формы
 * @namespace Shared.UI.FormFieldLabel
 */
export const FormFieldLabel = ({ text, children, className = "", ...props }: FormFieldLabelProps) => {
  const classes = makeClasses("flex", "flex-col", "gap-1", "hover:text-primary", className)
  const textClasses = makeClasses("px-(--ui-offset-x)", "text-sm", "font-semibold", "cursor-pointer")

  return (
    <label {...props} className={classes}>
      <span className={textClasses}>{text}</span>
      {children}
    </label>
  )
}
