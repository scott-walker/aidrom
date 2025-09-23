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
  const classes = makeClasses("flex", inline ? "flex-row items-center gap-4" : "flex-col gap-1", props.className)
  const textClasses = makeClasses(
    !inline && "px-(--ui-offset-x)",
    "min-w-fit",
    "text-sm",
    "font-semibold",
    "cursor-pointer"
  )

  return (
    <label {...props} className={classes}>
      <span className={textClasses}>{text}</span>
      {children}
    </label>
  )
}
