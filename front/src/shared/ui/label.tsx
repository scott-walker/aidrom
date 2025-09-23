import { makeClasses } from "@lib/style-api"
import type { ComponentProps, ReactNode } from "react"

/**
 * Пропсы лейбла
 * @namespace Shared.UI.Label.LabelProps
 */
interface LabelProps extends ComponentProps<"label"> {
  children: ReactNode
  text: string
  inline?: boolean
  className?: string
}

/**
 * Лейбл
 * @namespace Shared.UI.Label
 */
export const Label = ({ children, text, inline = true, ...props }: LabelProps) => {
  const classes = makeClasses("flex", inline ? "flex-row items-center" : "flex-col gap-1", props.className)
  const textClasses = makeClasses("min-w-fit", "px-(--ui-offset-x)", "text-sm", "font-semibold", "cursor-pointer")

  return (
    <label {...props} className={classes}>
      <span className={textClasses}>{text}</span>
      {children}
    </label>
  )
}
